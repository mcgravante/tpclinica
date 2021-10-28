import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';

@Component({
  selector: 'app-lista-especialidades',
  templateUrl: './lista-especialidades.component.html',
  styleUrls: ['./lista-especialidades.component.scss']
})
export class ListaEspecialidadesComponent implements OnInit {
  @Output() seSeleccionoEspecialidad: EventEmitter<any> = new EventEmitter<any>();

  arrayEspecialidades: Especialidad[] = [];
  filter: string = '';


  constructor(public especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.especialidadService.getEspecialidades().subscribe((especialidades: any) => {
      let listaEspecialidades: Especialidad[] = [];
      for (let index = 0; index < especialidades.length; index++) {
        const especialidad = especialidades[index];
        listaEspecialidades.push(especialidad.payload.doc.data());
      }
      this.arrayEspecialidades = listaEspecialidades;
    })
  }

  seleccionarEspecialidad(especialidad: Especialidad) {
    this.seSeleccionoEspecialidad.emit(especialidad);
  }

}
