import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Administrador } from 'src/app/clases/administrador';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { EspecialistaService } from 'src/app/servicios/especialista.service';
import { PacienteService } from 'src/app/servicios/paciente.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit {
  @Output() seSeleccionoAdministrador: EventEmitter<any> = new EventEmitter<any>();
  @Output() seSeleccionoPaciente: EventEmitter<any> = new EventEmitter<any>();
  @Output() seSeleccionoEspecialista: EventEmitter<any> = new EventEmitter<any>();
  @Input() tipoUsuarios: string;


  arrayAdministradores: Administrador[] = [];
  arrayPacientes: Paciente[] = [];
  arrayEspecialistas: Especialista[] = [];


  constructor(
    public administradorService: AdministradorService,
    public especialistaService: EspecialistaService,
    public pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.administradorService.getAdministradores().subscribe((administradores: any) => {
      let listaAdmins: Administrador[] = [];
      for (let index = 0; index < administradores.length; index++) {
        const administrador = administradores[index];
        listaAdmins.push(administrador.payload.doc.data());
      }
      this.arrayAdministradores = listaAdmins;
    })
    this.pacienteService.getPacientes().subscribe((pacientes: any) => {
      let listaPac: Paciente[] = [];
      for (let index = 0; index < pacientes.length; index++) {
        const paciente = pacientes[index];
        listaPac.push(paciente.payload.doc.data());
      }
      this.arrayPacientes = listaPac;
    })
    this.especialistaService.getEspecialistas().subscribe((especialistas: any) => {
      let listaEspec: Especialista[] = [];
      for (let index = 0; index < especialistas.length; index++) {
        const especialista = especialistas[index];
        listaEspec.push(especialista.payload.doc.data());
      }
      this.arrayEspecialistas = listaEspec;
    })
  }

  SeleccionarAdministrador(administrador: Administrador) {
    this.seSeleccionoAdministrador.emit(administrador);
  }

  SeleccionarPaciente(paciente: Paciente) {
    this.seSeleccionoPaciente.emit(paciente);
  }

  SeleccionarEspecialista(especialista: Especialista) {
    this.seSeleccionoEspecialista.emit(especialista);
  }

  habilitarEspecialista(especialista: Especialista, habilitado: boolean) {
    especialista.habilitado = habilitado;
    this.especialistaService.habilitarEspecialista(especialista.mail, habilitado)
  }

}
