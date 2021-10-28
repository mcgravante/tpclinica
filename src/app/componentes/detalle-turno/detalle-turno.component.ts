import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EstadoTurno, Turno } from 'src/app/clases/turno';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-detalle-turno',
  templateUrl: './detalle-turno.component.html',
  styleUrls: ['./detalle-turno.component.scss']
})
export class DetalleTurnoComponent implements OnInit {
  turnoCancelado: boolean = false;
  turnoCambioEstado: boolean = false;
  formCancelacionTurno: FormGroup;
  formCalificacion: FormGroup;
  formCanceloRechazoTurno: FormGroup;
  formFinalizoTurno: FormGroup;

  verResenia: boolean = false;
  completarCalificacion: boolean = false;
  mensajeBotonResenia: string = "Ver reseña";
  mensajeBotonCancelarTurno: string = "Cancelar turno";
  mensajeBotonCalificacion: string = "Calificar atención";
  mensajeBotonCambiarEstadoTurno: string = "Modificar estado";
  listaEstados: EstadoTurno[] = [];
  dropdownSettings: IDropdownSettings = {};
  estadoSeleccionado: EstadoTurno;


  @Input() turnoSeleccionado: Turno = null;
  @Input() especialista: boolean = false;
  @Input() paciente: boolean = false;
  @Input() administrador: boolean = false;




  constructor(public turnosService: TurnosService, public fb: FormBuilder) {
    this.formCancelacionTurno = fb.group({
      comentarioCancelacion: ["", Validators.required]
    });
    this.formCalificacion = fb.group({
      calificacion: ["", Validators.required]
    });
    this.formCanceloRechazoTurno = fb.group({
      resenia: ["", Validators.required]
    });
    this.formFinalizoTurno = fb.group({
      resenia: ["", Validators.required]
    });

  }

  ngOnInit(): void {

  }
  abrirForm() {
    if (this.turnoCancelado == false) {
      this.turnoCancelado = true;
      this.mensajeBotonCancelarTurno = "Cerrar";
    }
    else {
      this.turnoCancelado = false;
      this.mensajeBotonCancelarTurno = "Cancelar turno";
    }
  }
  abrirCalificacion() {
    if (this.completarCalificacion == false) {
      this.completarCalificacion = true;
      this.mensajeBotonCalificacion = "Cerrar";
    }
    else {
      this.completarCalificacion = false;
      this.mensajeBotonCalificacion = "Calificar atención";
    }
  }
  mostrarResenia() {
    if (this.verResenia == false) {
      this.verResenia = true;
      this.mensajeBotonResenia = "Ocultar reseña";
    }
    else {
      this.verResenia = false;
      this.mensajeBotonResenia = "Ver reseña";
    }

  }

  cambiarEstadoTurno(turno: Turno) {
    turno.estado = this.estadoSeleccionado;
    if (this.estadoSeleccionado == 'Cancelado' || this.estadoSeleccionado == 'Rechazado') {
      turno.resenia = this.formCanceloRechazoTurno.controls['resenia'].value;

    } else if (this.estadoSeleccionado == 'Finalizado') {
      turno.resenia = this.formFinalizoTurno.controls['resenia'].value;
    }
    this.turnosService.cambiarEstadoTurno(turno)
    this.turnoSeleccionado.estado = turno.estado;
    this.estadoSeleccionado = null;
    this.turnoCambioEstado = false;
    this.mensajeBotonCambiarEstadoTurno = "Modificar estado";
  }

  cancelarTurno(turno: Turno) {
    turno.resenia = this.formCancelacionTurno.controls['comentarioCancelacion'].value;
    turno.estado = EstadoTurno.cancelado;
    this.turnosService.cambiarEstadoTurno(turno)
    this.turnoSeleccionado.estado = EstadoTurno.cancelado;
    this.turnoCancelado = false;
  }

  calificarAtencion(turno: Turno) {
    turno.calificacion = this.formCalificacion.controls['calificacion'].value;
    this.turnosService.calificar(turno);
  }

  fillListaEstados(turno: Turno) {
    if (turno.estado == EstadoTurno.enespera) {
      this.listaEstados = [EstadoTurno.aceptado, EstadoTurno.cancelado, EstadoTurno.rechazado];
    } else if (turno.estado == EstadoTurno.aceptado) {
      this.listaEstados = [EstadoTurno.finalizado]
    } else {
      this.listaEstados = []
    }
  }
  abrirFormCambioEstado(turno: Turno) {
    if (this.turnoCambioEstado == false) {
      this.turnoCambioEstado = true;
      this.mensajeBotonCambiarEstadoTurno = "Cerrar";
      this.fillListaEstados(turno);
    }
    else {
      this.turnoCambioEstado = false;
      this.mensajeBotonCambiarEstadoTurno = "Modificar estado";
    }

  }

}
