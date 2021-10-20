import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/clases/administrador';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss']
})
export class SeccionUsuariosComponent implements OnInit {
  tipoUsuarios: string = 'Especialistas';
  administrador: Administrador;
  paciente: Paciente;
  especialista: Especialista;
  constructor() { }

  ngOnInit(): void {
  }

  mostrarAdministrador(administrador: Administrador) {
    this.limpiar();
    this.administrador = administrador;
  }

  mostrarPaciente(paciente: Paciente) {
    this.limpiar();
    this.paciente = paciente;
  }

  mostrarEspecialista(especialista: Especialista) {
    this.limpiar();
    this.especialista = especialista;
  }

  limpiar() {
    if (this.administrador != null) {
      this.administrador = null;
    }
    if (this.especialista != null) {
      this.especialista = null;
    }
    if (this.paciente != null) {
      this.paciente = null;
    }
  }

  cambiarTabla(tipoUsuarios: string) {
    this.limpiar();
    this.tipoUsuarios = tipoUsuarios;
  }

}
