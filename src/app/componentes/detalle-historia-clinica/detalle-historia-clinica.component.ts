import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HistoriasClinicasService } from 'src/app/servicios/historias-clinicas.service';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Paciente } from 'src/app/clases/paciente';
import { Especialista } from 'src/app/clases/especialista';
import { trigger, transition, animate, style, state } from '@angular/animations';


@Component({
  selector: 'app-detalle-historia-clinica',
  templateUrl: './detalle-historia-clinica.component.html',
  styleUrls: ['./detalle-historia-clinica.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class DetalleHistoriaClinicaComponent implements OnInit {

  arrayHistoriasClinicas: HistoriaClinica[] = [];
  @Input() pacienteSeleccionado: Paciente;
  @Input() especialistaSeleccionado: Especialista;
  user: any = JSON.parse(localStorage.getItem('loggedUser'));
  public visible: boolean = true;

  constructor(public historiasService: HistoriasClinicasService) { }

  ngOnInit(): void {
    if (!this.especialistaSeleccionado) {
      let historiasParaMostrar = [];
      let buscadorHistorias = this.historiasService.getHistoria(this.pacienteSeleccionado.mail).subscribe((historias: any) => {
        for (let index = 0; index < historias.length; index++) {
          let historia: any = historias[index].payload.doc.data();
          historia.fecha = historia.fecha.toDate();
          historiasParaMostrar.push(historia);
        }
        this.arrayHistoriasClinicas = historiasParaMostrar.sort(function (a, b) {
          return a.fecha - b.fecha;
        });
        buscadorHistorias.unsubscribe();
      })
    }
  }

  ngOnChanges() {
    if (this.especialistaSeleccionado) {
      let historiasParaMostrar = [];
      let buscadorHistorias = this.historiasService.getHistoriasByPacienteAndEspecialista(this.pacienteSeleccionado.mail, this.especialistaSeleccionado.mail).subscribe((historias: any) => {
        for (let index = 0; index < historias.length; index++) {
          let historia: any = historias[index].payload.doc.data();
          historia.fecha = historia.fecha.toDate();
          historiasParaMostrar.push(historia);
        }
        this.arrayHistoriasClinicas = historiasParaMostrar.sort(function (a, b) {
          return a.fecha - b.fecha;
        });
        buscadorHistorias.unsubscribe();

      })
    }
  }

  public openPDF(): void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('Historia_Clínica_' + this.pacienteSeleccionado.nombre + '_' + this.pacienteSeleccionado.apellido + '.pdf');
    });
  }

  verTodas() {
    this.especialistaSeleccionado = null;
    this.ngOnInit();
  }

}
