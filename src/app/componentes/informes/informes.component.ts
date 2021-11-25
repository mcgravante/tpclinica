import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/servicios/log.service';
import * as XLSX from 'xlsx';
import { Chart } from 'chart.js';
import * as Highcharts from 'highcharts';
import { TurnosService } from 'src/app/servicios/turnos.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {
  fechaInicio: Date;
  fechaFin: Date;

  localOffset = new Date().getTimezoneOffset(); // in minutes
  localOffsetMillis = 60 * 1000 * this.localOffset;

  barChart: Chart;
  pieChart: Chart;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(public logService: LogService, public turnosService: TurnosService) { }

  ngOnInit(): void {

  }

  bajarInformeLogs(): void {
    let listaLogs = [];
    let logSubs = this.logService.getLogs().subscribe((logs: any) => {
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
      logSubs.unsubscribe();
    })
  }

  bajarTurnosPorEspecialidadPDF() {
    let listaTurnos = [];
    let arrayCantidadTurnosPorEspecialidad = [];
    let columnNames = [];
    let groupedArray = [];
    let turnosSubs = this.turnosService.getTurnos().subscribe(async (turnos: any) => {
      for (let index = 0; index < turnos.length; index++) {
        let turno = turnos[index].payload.doc.data();
        listaTurnos.push(turno);
      }
      groupedArray = listaTurnos.reduce(function (r, a) {
        r[a.especialidad] = r[a.especialidad] || [];
        r[a.especialidad].push(a);
        return r;
      }, Object.create(null));

      for (const [key, value] of Object.entries(groupedArray)) {
        arrayCantidadTurnosPorEspecialidad.push([key, value.length])
        columnNames.push(key);
      }

      Highcharts.chart("container", {
        title: {
          text: undefined
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Turnos por especialidad',
          colorByPoint: true,
          type: 'pie',
          data: arrayCantidadTurnosPorEspecialidad,
        }]
      });

      await new Promise(f => setTimeout(f, 1000));

      let DATA = document.getElementById("container");

      DATA.hidden = false;

      html2canvas(DATA).then(canvas => {

        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;

        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

        PDF.save('Informe_Turnos_Por_Especialidad.pdf');
        DATA.hidden = true;
      });
      turnosSubs.unsubscribe();
    });
  }

  bajarTurnosPorEspecialidadExcel() {
    let listaTurnos = [];
    let arrayCantidadTurnosPorEspecialidad = [];
    let columnNames = [];
    let groupedArray = [];
    let turnosSubs = this.turnosService.getTurnos().subscribe((turnos: any) => {
      for (let index = 0; index < turnos.length; index++) {
        let turno = turnos[index].payload.doc.data();
        listaTurnos.push(turno);
      }
      groupedArray = listaTurnos.reduce(function (r, a) {
        r[a.especialidad] = r[a.especialidad] || [];
        r[a.especialidad].push(a);
        return r;
      }, Object.create(null));

      for (const [key, value] of Object.entries(groupedArray)) {
        arrayCantidadTurnosPorEspecialidad.push([key, value.length])
      }

      var ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
        ["Especialidad", "Cantidad"]
      ]);
      XLSX.utils.sheet_add_json(ws, arrayCantidadTurnosPorEspecialidad, { origin: -1, skipHeader: true });

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, 'Informe_Turnos_Por_Especialidad.xlsx');
      turnosSubs.unsubscribe();
    })
  }

  bajarTurnosPorDiaExcel() {
    let listaTurnos = [];
    let arrayCantidadTurnosPorDia = [];
    let columnNames = [];
    let groupedArray = [];
    let turnosSubs = this.turnosService.getTurnos().subscribe((turnos: any) => {
      for (let index = 0; index < turnos.length; index++) {
        let turno = turnos[index].payload.doc.data();
        listaTurnos.push(turno);
      }
      groupedArray = listaTurnos.reduce(function (r, a) {
        r[new Date(a.fecha).toDateString()] = r[new Date(a.fecha).toDateString()] || [];
        r[new Date(a.fecha).toDateString()].push(a);
        return r;
      }, Object.create(null));

      for (const [key, value] of Object.entries(groupedArray)) {
        arrayCantidadTurnosPorDia.push([key, value.length])
        columnNames.push(key);
      }

      var ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
        ["Día", "Cantidad"]
      ]);
      XLSX.utils.sheet_add_json(ws, arrayCantidadTurnosPorDia, { origin: -1, skipHeader: true });

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, 'Informe_Turnos_Por_Dia.xlsx');
      turnosSubs.unsubscribe();
    })
  }

  bajarTurnosPorLapsoSeleccionadoExcel() {
    let listaTurnos = [];
    let arrayCantidadTurnosPorLapso = [];
    let columnNames = [];
    let groupedArray = [];
    let turnosSubs = this.turnosService.getTurnos().subscribe((turnos: any) => {
      for (let index = 0; index < turnos.length; index++) {
        let turno = turnos[index].payload.doc.data();
        listaTurnos.push(turno);
      }

      listaTurnos = listaTurnos.filter((turno: any) => {
        return this.withoutTime(new Date(turno.fecha)).getTime() >= new Date(this.fechaInicio).getTime() + this.localOffsetMillis &&
          this.withoutTime(new Date(turno.fecha)).getTime() <= new Date(this.fechaFin).getTime() + this.localOffsetMillis;
      });

      groupedArray = listaTurnos.reduce(function (r, a) {
        r[a.especialistaNombre] = r[a.especialistaNombre] || [];
        r[a.especialistaNombre].push(a);
        return r;
      }, Object.create(null));

      for (const [key, value] of Object.entries(groupedArray)) {
        arrayCantidadTurnosPorLapso.push([key, value.length])
        columnNames.push(key);
      }

      var ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([["Lapso: " + this.fechaInicio + ' al ' + this.fechaFin],
      ["Especialista", "Cantidad"]
      ]);
      XLSX.utils.sheet_add_json(ws, arrayCantidadTurnosPorLapso, { origin: -1, skipHeader: true });

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, 'Informe_Turnos_Por_Lapso.xlsx');
      turnosSubs.unsubscribe();
    })

  }

  bajarTurnosFinalizadosPorLapsoSeleccionadoExcel() {
    let listaTurnos = [];
    let arrayCantidadTurnosPorLapso = [];
    let columnNames = [];
    let groupedArray = [];
    let turnosSubs = this.turnosService.getTurnosFinalizados().subscribe((turnos: any) => {
      for (let index = 0; index < turnos.length; index++) {
        let turno = turnos[index].payload.doc.data();
        listaTurnos.push(turno);
      }

      listaTurnos = listaTurnos.filter((turno: any) => {
        return this.withoutTime(new Date(turno.fecha)).getTime() >= new Date(this.fechaInicio).getTime() + this.localOffsetMillis &&
          this.withoutTime(new Date(turno.fecha)).getTime() <= new Date(this.fechaFin).getTime() + this.localOffsetMillis;
      });

      groupedArray = listaTurnos.reduce(function (r, a) {
        r[a.especialistaNombre] = r[a.especialistaNombre] || [];
        r[a.especialistaNombre].push(a);
        return r;
      }, Object.create(null));

      for (const [key, value] of Object.entries(groupedArray)) {
        arrayCantidadTurnosPorLapso.push([key, value.length])
        columnNames.push(key);
      }

      var ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([["Lapso: " + this.fechaInicio + ' al ' + this.fechaFin],
      ["Especialista", "Cantidad Finalizados"]
      ]);
      XLSX.utils.sheet_add_json(ws, arrayCantidadTurnosPorLapso, { origin: -1, skipHeader: true });

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, 'Informe_Turnos_Finalizados_Por_Lapso.xlsx');

      turnosSubs.unsubscribe();
    })

  }

  bajarTurnosPorDiaPDF() {

    let listaTurnos = [];
    let arrayCantidadTurnosPorDia = [];
    let columnNames = [];
    let groupedArray = [];
    let turnosSubs = this.turnosService.getTurnos().subscribe(async (turnos: any) => {
      for (let index = 0; index < turnos.length; index++) {
        let turno = turnos[index].payload.doc.data();
        listaTurnos.push(turno);
      }

      listaTurnos.sort((val1, val2) => { return new Date(val1.fecha).getTime() - new Date(val2.fecha).getTime() })


      groupedArray = listaTurnos.reduce(function (r, a) {
        r[new Date(a.fecha).toDateString()] = r[new Date(a.fecha).toDateString()] || [];
        r[new Date(a.fecha).toDateString()].push(a);
        return r;
      }, Object.create(null));

      for (const [key, value] of Object.entries(groupedArray)) {
        arrayCantidadTurnosPorDia.push([key, value.length])
        columnNames.push(key);
      };

      Highcharts.chart('container', {

        title: {
          text: undefined
        },

        yAxis: [{
          className: 'highcharts-color-0',
          title: {
            text: 'Cantidad'
          }
        }],

        xAxis: {
          categories: columnNames
        },

        series: [{
          data: arrayCantidadTurnosPorDia,
          type: 'line',
          name: 'Turnos por día'
        }],

        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }

      });

      await new Promise(f => setTimeout(f, 1000));

      let DATA = document.getElementById("container");

      DATA.hidden = false;

      html2canvas(DATA).then(canvas => {

        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;

        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

        PDF.save('Informe_Turnos_Por_Dia.pdf');
      });
      DATA.hidden = true;
      turnosSubs.unsubscribe();
    });
  }

  bajarTurnosPorLapsoSeleccionadoPDF() {
    let listaTurnos = [];
    let arrayCantidadTurnosPorLapso = [];
    let columnNames = [];
    let groupedArray = [];
    let turnosSubs = this.turnosService.getTurnos().subscribe(async (turnos: any) => {
      for (let index = 0; index < turnos.length; index++) {
        let turno = turnos[index].payload.doc.data();
        listaTurnos.push(turno);
      }

      listaTurnos = listaTurnos.filter((turno: any) => {
        return this.withoutTime(new Date(turno.fecha)).getTime() >= new Date(this.fechaInicio).getTime() + this.localOffsetMillis &&
          this.withoutTime(new Date(turno.fecha)).getTime() <= new Date(this.fechaFin).getTime() + this.localOffsetMillis;
      });

      groupedArray = listaTurnos.reduce(function (r, a) {
        r[a.especialistaNombre] = r[a.especialistaNombre] || [];
        r[a.especialistaNombre].push(a);
        return r;
      }, Object.create(null));

      for (const [key, value] of Object.entries(groupedArray)) {
        arrayCantidadTurnosPorLapso.push([key, value.length])
        columnNames.push(key);
      }

      Highcharts.chart("container", {
        title: {
          text: undefined
        },
        yAxis: [{
          className: 'highcharts-color-0',
          title: {
            text: 'Cantidad'
          }
        }],
        plotOptions: {
          column: {
            borderRadius: 5
          }
        },
        series: [{
          data: arrayCantidadTurnosPorLapso,
          type: 'column',
          name: 'Turnos del ' + this.fechaInicio + ' al ' + this.fechaFin
        }],
        xAxis: {
          categories: columnNames
        },

      });

      await new Promise(f => setTimeout(f, 1000));

      let DATA = document.getElementById("container");
      DATA.hidden = false;

      html2canvas(DATA).then(canvas => {

        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;

        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

        PDF.save('Informe_Turnos_Por_Lapso.pdf');
      });
      DATA.hidden = true;

      turnosSubs.unsubscribe();
    });
  }

  bajarTurnosFinalizadosPorLapsoSeleccionadoPDF() {

    let listaTurnos = [];
    let arrayCantidadTurnosPorLapso = [];
    let columnNames = [];
    let groupedArray = [];
    let turnosSubs = this.turnosService.getTurnosFinalizados().subscribe(async (turnos: any) => {
      for (let index = 0; index < turnos.length; index++) {
        let turno = turnos[index].payload.doc.data();
        listaTurnos.push(turno);
      }

      listaTurnos = listaTurnos.filter((turno: any) => {
        return this.withoutTime(new Date(turno.fecha)).getTime() >= new Date(this.fechaInicio).getTime() + this.localOffsetMillis &&
          this.withoutTime(new Date(turno.fecha)).getTime() <= new Date(this.fechaFin).getTime() + this.localOffsetMillis;
      });

      groupedArray = listaTurnos.reduce(function (r, a) {
        r[a.especialistaNombre] = r[a.especialistaNombre] || [];
        r[a.especialistaNombre].push(a);
        return r;
      }, Object.create(null));

      for (const [key, value] of Object.entries(groupedArray)) {
        arrayCantidadTurnosPorLapso.push([key, value.length])
        columnNames.push(key);
      }

      Highcharts.chart("container", {
        title: {
          text: undefined
        },
        yAxis: [{
          className: 'highcharts-color-0',
          title: {
            text: 'Cantidad'
          }
        }],
        plotOptions: {
          column: {
            borderRadius: 5
          }
        },
        series: [{
          data: arrayCantidadTurnosPorLapso,
          type: 'column',
          name: 'Turnos finalizados del ' + this.fechaInicio + ' al ' + this.fechaFin
        }],
        xAxis: {
          categories: columnNames
        },

      });

      await new Promise(f => setTimeout(f, 1000));

      let DATA = document.getElementById("container");
      DATA.hidden = false;

      html2canvas(DATA).then(canvas => {

        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;

        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

        PDF.save('Informe_Turnos_Finalizados_Por_Lapso.pdf');
      });
      DATA.hidden = true;

      turnosSubs.unsubscribe();
    });

  }

  withoutTime(dateTime) {
    var date = new Date(dateTime.getTime());
    date.setHours(0, 0, 0, 0);
    return date;
  }

}
