import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication-service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Especialidad } from 'src/app/clases/especialidad';
import { EstadoTurno, Turno } from 'src/app/clases/turno';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { Especialista } from 'src/app/clases/especialista';
import { Franja } from 'src/app/clases/franja';
import { DatePipe } from '@angular/common'


import { Paciente } from 'src/app/clases/paciente';
import { DisponibilidadEspecialistaService } from 'src/app/servicios/disponibilidad-especialista.service';
import { DisponibilidadEspecialistas } from 'src/app/clases/disponibilidad-especialistas';
import { Time } from '@angular/common';


@Component({
  selector: 'app-alta-turnos',
  templateUrl: './alta-turnos.component.html',
  styleUrls: ['./alta-turnos.component.scss']
})
export class AltaTurnosComponent implements OnInit {
  eligioEspecialista: boolean = false;

  especialidadSeleccionada: Especialidad;
  especialistaSeleccionado: Especialista;
  pacienteSeleccionado: Paciente;

  turnoSeleccionado: Date;
  captchaResolved: boolean = false;

  esAdmin: boolean = false;
  pacienteNombre: string;
  disponibilidadesArray: DisponibilidadEspecialistas[] = [];
  turnosArray: Date[] = [];

  formAltaTurno: FormGroup;

  constructor(
    public datepipe: DatePipe,
    public turnosService: TurnosService,
    public authService: AuthenticationService,
    public router: Router,
    public toastr: ToastrService,
    public fb: FormBuilder,
    public disponibilidadService: DisponibilidadEspecialistaService
  ) {

    this.formAltaTurno = fb.group({
      especialista: ["", Validators.required],
      fecha: ["", Validators.required],
      especialidad: ["", Validators.required],
      paciente: ["", Validators.required],
      reCaptcha: ['', Validators.required]
    })
  }

  ngOnInit() {
    let user: any = JSON.parse(localStorage.getItem('loggedUser'));
    if (user.tipo == 'administrador') {
      this.esAdmin = true;
    }
    else if (user.tipo == 'paciente') {
      this.formAltaTurno.controls['paciente'].setValue(user.nombre + ' ' + user.apellido);
      this.pacienteSeleccionado = user;
    }

  }

  guardarTurno() {
    let pacienteMail: string = this.pacienteSeleccionado.mail;
    let pacienteNombre = this.formAltaTurno.controls['paciente'].value;
    let especialistaMail = this.especialistaSeleccionado.mail;
    let especialistaNombre = this.especialistaSeleccionado.nombre + ' ' + this.especialistaSeleccionado.apellido;
    let especialidad = this.formAltaTurno.controls['especialidad'].value;
    let fecha = this.formAltaTurno.controls['fecha'].value;
    let turno: Turno = new Turno(pacienteMail, pacienteNombre, especialistaMail, especialistaNombre, fecha, especialidad, EstadoTurno.enespera, "", "", "")
    this.turnosService.guardarTurno(turno).then(resp => {
      this.showSuccess();
    }).catch((error) => {
      this.showError(error);
    });
    this.borrarTurnosReservados();
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
    this.formAltaTurno.controls['fecha'].setValue('');
    this.turnosArray = [];
    this.getDisponibilidad();
  }

  cambiarEspecialista(especialista: Especialista) {
    this.especialistaSeleccionado = especialista;
    this.formAltaTurno.controls['especialidad'].setValue('');
    this.turnosArray = [];
    if (this.especialistaSeleccionado.especialidades.length == 1) {
      this.cambiarEspecialidad(this.especialistaSeleccionado.especialidades[0])
    }
    this.eligioEspecialista = true;
    this.formAltaTurno.controls['especialista'].setValue(especialista.nombre);
    this.formAltaTurno.controls['fecha'].setValue('');
  }

  cambiarTurno(turno: Date) {
    this.turnoSeleccionado = turno;
    this.formAltaTurno.controls['fecha'].setValue(this.datepipe.transform(turno, 'yyyy-MM-dd HH:mm'));
  }


  cambiarPaciente(paciente: Paciente) {
    this.pacienteSeleccionado = paciente;
    this.formAltaTurno.controls['paciente'].setValue(paciente.nombre);
  }

  getDisponibilidad() {
    let listaDias: string[] = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
    this.disponibilidadService.getDisponibilidadesByEspecialistaEspecialidad(this.especialistaSeleccionado.mail, this.especialidadSeleccionada.nombre).subscribe((disponibilidades: any) => {
      for (let index = 0; index < disponibilidades.length; index++) {
        let disponibilidad = disponibilidades[index].payload.doc.data();
        for (let index = 0; index < disponibilidad.franjas.length; index++) {
          let franja: Franja = new Franja(disponibilidad.franjas[index].dia, this.extractTime(disponibilidad.franjas[index].start), this.extractTime(disponibilidad.franjas[index].finish));
          let primerTurno = new Date(), ultimoTurno = new Date();
          ultimoTurno.setDate(ultimoTurno.getDate() + 15);
          while (listaDias[primerTurno.getDay()] != franja.dia.toString()) {
            primerTurno.setDate(primerTurno.getDate() + 1)
          }
          primerTurno.setHours(franja.start.hours);
          primerTurno.setMinutes(franja.start.minutes);
          primerTurno.setSeconds(0);
          primerTurno.setMilliseconds(0);

          while (listaDias[ultimoTurno.getDay()] != franja.dia.toString()) {
            ultimoTurno.setDate(ultimoTurno.getDate() - 1)
          }
          ultimoTurno.setHours(franja.finish.hours);
          ultimoTurno.setMinutes(franja.finish.minutes - disponibilidad.duracionTurno);
          ultimoTurno.setSeconds(0);
          ultimoTurno.setMilliseconds(0);

          let turnoInicial = new Date();
          turnoInicial.setDate(primerTurno.getDate());
          turnoInicial.setHours(primerTurno.getHours());
          turnoInicial.setMinutes(primerTurno.getMinutes());
          turnoInicial.setSeconds(0);
          turnoInicial.setMilliseconds(0);

          this.turnosArray.push(turnoInicial)

          while (primerTurno <= ultimoTurno) {
            primerTurno.setMinutes(primerTurno.getMinutes() + disponibilidad.duracionTurno);

            let primerTurnoDelDia = new Date();
            primerTurnoDelDia.setDate(primerTurno.getDate());
            primerTurnoDelDia.setHours(franja.start.hours);
            primerTurnoDelDia.setMinutes(franja.start.minutes);
            primerTurnoDelDia.setSeconds(0);
            primerTurnoDelDia.setMilliseconds(0);

            let ultimoTurnoDelDia = new Date();
            ultimoTurnoDelDia.setDate(primerTurno.getDate());
            ultimoTurnoDelDia.setHours(franja.finish.hours);
            ultimoTurnoDelDia.setMinutes(franja.finish.minutes - disponibilidad.duracionTurno);
            ultimoTurnoDelDia.setSeconds(0);
            ultimoTurnoDelDia.setMilliseconds(0);

            let turno = new Date();
            turno.setDate(primerTurno.getDate());
            turno.setHours(primerTurno.getHours());
            turno.setMinutes(primerTurno.getMinutes());
            turno.setSeconds(0);
            turno.setMilliseconds(0);

            if (listaDias[turno.getDay()] == franja.dia.toString() && turno >= primerTurnoDelDia && turno <= ultimoTurnoDelDia) {
              this.turnosArray.push(turno);
            }

          }
        }
      }
      this.borrarTurnosReservados()
    })
  }

  extractTime(time: string): Time {
    const [h, m] = time.split(':');
    return { hours: +h, minutes: +m };
  }

  borrarTurnosReservados() {
    let turnosSuscription = this.turnosService.getTurnosByEspecialista(this.especialistaSeleccionado.mail).subscribe((turnos: any) => {
      for (let index = 0; index < turnos.length; index++) {
        let turno: Turno = turnos[index].payload.doc.data();
        this.turnosArray.splice(this.turnosArray.findIndex(t => (t.getTime() == new Date(turno.fecha).getTime() && (turno.estado == EstadoTurno.enespera || turno.estado == EstadoTurno.aceptado))), 1);
      }
      this.turnosArray.sort((val1, val2) => { return val1.getTime() - val2.getTime() })
      turnosSuscription.unsubscribe()
    })
  }

}
