import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { EspecialistaService } from 'src/app/servicios/especialista.service';

@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.scss']
})
export class ListaEspecialistasComponent implements OnInit {
  @Output() seSeleccionoEspecialista: EventEmitter<any> = new EventEmitter<any>();
  @Input() especialidadSeleccionada: Especialidad;
  public static updateListaEspecialistas: Subject<boolean> = new Subject();


  arrayEspecialistas: Especialista[] = [];
  filter: string = '';


  constructor(public especialistaService: EspecialistaService) {
  }

  ngOnChanges() {

    this.especialistaService.getEspecialistasByEspecialidad(this.especialidadSeleccionada).subscribe((especialistas: any) => {
      let listaEspecialistas: Especialista[] = [];
      for (let index = 0; index < especialistas.length; index++) {
        const especialista = especialistas[index];
        listaEspecialistas.push(especialista.payload.doc.data());
      }
      this.arrayEspecialistas = listaEspecialistas;
    })

  }

  ngOnInit(): void {
  }

  seleccionarEspecialista(especialista: Especialista) {
    this.seSeleccionoEspecialista.emit(especialista);
  }

}
