import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/clases/administrador';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import * as XLSX from 'xlsx';


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
  arrayPacientes: Paciente[] = [];
  arrayTurnosPaciente: Turno[] = [];

  constructor(public pacienteService: PacienteService, public turnosService: TurnosService) { }

  ngOnInit(): void {
  }

  mostrarAdministrador(administrador: Administrador) {
    this.limpiar();
    this.administrador = administrador;
  }

  mostrarPaciente(paciente: Paciente) {
    this.limpiar();
    this.paciente = paciente;
    this.turnosService.getTurnosByPaciente(paciente.mail).subscribe((turnos: any) => {
      let listaTurnosPaciente: Turno[] = [];
      for (let index = 0; index < turnos.length; index++) {
        let turno: Turno = turnos[index].payload.doc.data()
        listaTurnosPaciente.push(turno);
      }
      this.arrayTurnosPaciente = listaTurnosPaciente;
    })
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
    this.arrayPacientes = [];
  }

  cambiarTabla(tipoUsuarios: string) {
    this.limpiar();
    this.tipoUsuarios = tipoUsuarios;
    if (this.tipoUsuarios == 'Pacientes') {
      this.pacienteService.getPacientes().subscribe((pacientes: any) => {
        let listaPac: Paciente[] = [];
        for (let index = 0; index < pacientes.length; index++) {
          let paciente = pacientes[index];
          listaPac.push(paciente.payload.doc.data());
        }
        this.arrayPacientes = listaPac;
      })
    }
  }

  exportExcelAll(): void {
    let fileName = 'DatosUsuarios.xlsx';

    /* table id is passed over here */
    let element = document.getElementById('excel-table-all');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);

  }

}
