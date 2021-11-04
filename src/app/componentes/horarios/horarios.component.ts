import { Time } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DisponibilidadEspecialistas } from 'src/app/clases/disponibilidad-especialistas';
import { Especialidad } from 'src/app/clases/especialidad';
import { Dia, Franja } from 'src/app/clases/franja';
import { DisponibilidadEspecialistaService } from 'src/app/servicios/disponibilidad-especialista.service';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';

const validarFranja: ValidatorFn = (formNuevaDisp: FormGroup) => {
  let diaSeleccionado = formNuevaDisp.controls['diaSeleccionado'].value;
  if (diaSeleccionado == 'domingo') {
    return { noSeTrabaja: true };
  }
  let comienzoDeFranja: Time = extractTime(formNuevaDisp.controls['comienzo'].value);
  let finalizacionDeFranja: Time = extractTime(formNuevaDisp.controls['finalizacion'].value);

  if (comienzoDeFranja.hours > finalizacionDeFranja.hours) {
    return { fueraDeRango: true };
  }
  else if (diaSeleccionado == 'sabado') {
    if (comienzoDeFranja.hours < 8 || finalizacionDeFranja.hours > 14) {
      return { fueraDeRango: true };
    }
    else {
      return null;
    }
  }
  else {
    if (comienzoDeFranja.hours < 8 || finalizacionDeFranja.hours > 19) {
      return { fueraDeRango: true };
    }
    else {
      return null;
    }
  }
}

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {
  @Output() seSeleccionoEspecialidad: EventEmitter<any> = new EventEmitter<any>();

  arrayEspecialidades: Especialidad[] = [];
  filter: string = '';
  especialista: any = JSON.parse(localStorage.getItem('loggedUser'));
  especialidadSeleccionada: Especialidad = new Especialidad('');
  listaDias: string[] = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
  listaFranjas: Franja[] = []
  start: Time;
  finish: Time;
  franja: Franja;
  formNuevaDisp: FormGroup;
  disponibilidadMuestra: DisponibilidadEspecialistas;

  constructor(public toastr: ToastrService,
    public especialidadService: EspecialidadService,
    public disponibilidadService: DisponibilidadEspecialistaService,
    public fb: FormBuilder) {
    this.formNuevaDisp = fb.group({
      duracionTurno: ["", [Validators.required, Validators.min(30)]],
      especialidad: ["", Validators.required],
      diaSeleccionado: ["", Validators.required],
      comienzo: ["", [Validators.required, Validators.pattern]],
      finalizacion: ["", [Validators.required, Validators.pattern]],
    }, { validator: validarFranja });
  }

  ngOnInit(): void {
    this.arrayEspecialidades = this.especialista.especialidades;
  }

  seleccionarEspecialidad(especialidad: Especialidad) {
    this.disponibilidadMuestra = null;
    this.listaFranjas = [];
    this.especialidadSeleccionada = especialidad;
    this.disponibilidadService.getDisponibilidadesByEspecialistaEspecialidad(this.especialista.mail, this.especialidadSeleccionada.nombre).subscribe((disponibilidades: any) => {
      if (disponibilidades.length != 0) {
        this.disponibilidadMuestra = disponibilidades[0].payload.doc.data()
      }
    })
    this.formNuevaDisp.controls['especialidad'].setValue(especialidad.nombre);
  }

  agregarFranja() {
    let diaSeleccionado = this.formNuevaDisp.controls['diaSeleccionado'].value;
    let start = this.formNuevaDisp.controls['comienzo'].value;
    let finish = this.formNuevaDisp.controls['finalizacion'].value;
    let franja: Franja = new Franja(diaSeleccionado, start, finish)
    this.listaFranjas.push(franja);
  }

  agregarNuevaDisponibilidad() {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    let especialistaMail: string = loggedUser.mail;
    let especialidad = this.formNuevaDisp.controls['especialidad'].value;
    let duracionTurno = this.formNuevaDisp.controls['duracionTurno'].value;
    let disponibilidad: DisponibilidadEspecialistas = new DisponibilidadEspecialistas(this.listaFranjas, especialistaMail, especialidad, duracionTurno)
    this.disponibilidadService.guardarDisponibilidad(disponibilidad).then(resp => {
      this.showSuccess();
    }).catch((error) => {
      this.showError(error);
    });
    this.formNuevaDisp.controls['duracionTurno'].setValue('');
    this.formNuevaDisp.controls['diaSeleccionado'].setValue('');
    this.formNuevaDisp.controls['comienzo'].setValue('');
    this.formNuevaDisp.controls['finalizacion'].setValue('');
  }

  showSuccess() {
    this.toastr.success('Se guardó correctamente');
  }

  showError(error: any) {
    this.toastr.error('Algo salió mal. Error: ' + error);
  }

}
function extractTime(time: string): Time {
  const [h, m] = time.split(':');
  return { hours: +h, minutes: +m };
}

