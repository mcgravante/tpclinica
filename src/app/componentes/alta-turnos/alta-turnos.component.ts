import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication-service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Especialidad } from 'src/app/clases/especialidad';
import { EstadoTurno, Turno } from 'src/app/clases/turno';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';

@Component({
  selector: 'app-alta-turnos',
  templateUrl: './alta-turnos.component.html',
  styleUrls: ['./alta-turnos.component.scss']
})
export class AltaTurnosComponent implements OnInit {
  eligioEspecialidad: boolean = false;

  especialidadSeleccionada: Especialidad;
  especialistaSeleccionado: Especialista;
  esAdmin: boolean = false;


  formAltaTurno: FormGroup;

  constructor(
    public turnosService: TurnosService,
    public authService: AuthenticationService,
    public router: Router,
    public toastr: ToastrService,
    public fb: FormBuilder,
  ) {

    this.formAltaTurno = fb.group({
      especialista: ["", Validators.required],
      fecha: ["", [Validators.required, this.validarFecha]],
      especialidad: ["", Validators.required],
      paciente: ["", Validators.required]
    })
  }

  ngOnInit() {
    let user: any = JSON.parse(localStorage.getItem('loggedUser'));
    if (user.tipo == 'administrador') {
      this.esAdmin = true;
    }
  }

  guardarTurno() {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    let pacienteMail: string = loggedUser.mail;
    let pacienteNombre: string;
    if(this.esAdmin){
      pacienteNombre =  this.formAltaTurno.controls['paciente'].value;
    } else{
      pacienteNombre = loggedUser.nombre + ' ' + loggedUser.apellido;

    }
    let especialistaMail = this.especialistaSeleccionado.mail;
    let especialistaNombre = this.especialistaSeleccionado.nombre + ' ' + this.especialistaSeleccionado.apellido;
    let especialidad = this.formAltaTurno.controls['especialidad'].value;
    let fecha = this.formAltaTurno.controls['fecha'].value;
    let turno: Turno = new Turno(pacienteMail, pacienteNombre, especialistaMail, especialistaNombre, fecha, especialidad, EstadoTurno.enespera, "", "", "")
    this.turnosService.guardarTurno(turno).then(resp => {
      this.showSuccess();
    }).catch((error) => {
      this.showError(error);
    });;
  }

  showSuccess() {
    this.toastr.success('Se guardó correctamente');
  }

  showError(error: any) {
    this.toastr.error('Algo salió mal. Error: ' + error);
  }

  cambiarEspecialidad(especialidad: Especialidad) {
    this.formAltaTurno.controls['especialidad'].setValue(especialidad.nombre);
    this.especialidadSeleccionada = especialidad;
    this.eligioEspecialidad = true;
    this.formAltaTurno.controls['especialista'].setValue('');
  }

  cambiarEspecialista(especialista: Especialista) {
    this.especialistaSeleccionado = especialista;
    this.formAltaTurno.controls['especialista'].setValue(especialista.nombre);
  }
  cambiarPaciente(paciente: Paciente) {
    this.formAltaTurno.controls['paciente'].setValue(paciente.nombre);
  }
  validarFecha(control: AbstractControl) {
    let fechaUsuario: string = control.value;
    var formattedFechaUsuario = fechaUsuario.replace(/(\d+[-])(\d+[-])/, '$2$1');
    let fechaTentativa: any = new Date(formattedFechaUsuario);
    if (fechaTentativa == 'Invalid Date') {
      return { invalido: true };
    }
    else {
      return null;
    }
  }
}
