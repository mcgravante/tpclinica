import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/servicios/log.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {
  fechaInicio: Date;
  fechaFin: Date;

  constructor(public logService: LogService) { }

  ngOnInit(): void {
  }

  bajarInformeLogs(): void {
    let listaLogs = [];
    this.logService.getLogs().subscribe((logs: any) => {
      for (let index = 0; index < logs.length; index++) {
        let log = logs[index].payload.doc.data();
        log.fechaDeIngreso = log.fechaDeIngreso.toDate();
        listaLogs.push(log);
      }
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaLogs);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, 'Informe_Logs.xlsx');
    })
  }

  bajarTurnosPorEspecialidad() { }

  bajarTurnosPorDia() { }

  bajarTurnosPorLapsoSeleccionado() { }

  bajarTurnosFinalizadosPorLapsoSeleccionado() { }



}
