import { Component, Input, OnInit } from '@angular/core';
import { Administrador } from 'src/app/clases/administrador';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent implements OnInit {
  @Input() administrador: Administrador = null;
  @Input() especialista: Especialista = null;
  @Input() paciente: Paciente = null;
  @Input() arrayTurnosPaciente: Turno[] = [];
  user: any = JSON.parse(localStorage.getItem('loggedUser'));




  constructor() { }

  ngOnInit(): void {

  }

  exportExcelOnlyOne(): void {
    let fileName = 'DatosUsuario' + this.paciente.nombre + '_' + this.paciente.apellido + '.xlsx';

    /* table id is passed over here */
    let element = document.getElementById('excel-table-one');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    let element2 = document.getElementById('excel-turnos-table-one');
    const ws2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element2);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'DatosUsuario');
    XLSX.utils.book_append_sheet(wb, ws2, 'Turnos');

    /* save to file */
    XLSX.writeFile(wb, fileName);

  }
}
