import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';

@Component({
  selector: 'app-lista-especialidades',
  templateUrl: './lista-especialidades.component.html',
  styleUrls: ['./lista-especialidades.component.scss']
})
export class ListaEspecialidadesComponent implements OnInit {
  @Output() seSeleccionoEspecialidad: EventEmitter<any> = new EventEmitter<any>();
  @Input() especialistaSeleccionado: Especialista;


  arrayEspecialidades: Especialidad[] = [];
  filter: string = '';


  constructor(public especialidadService: EspecialidadService) { }

  ngOnChanges() {
    this.arrayEspecialidades = this.especialistaSeleccionado.especialidades;
  }

  ngOnInit() { }

  seleccionarEspecialidad(especialidad: Especialidad) {
    this.seSeleccionoEspecialidad.emit(especialidad);
  }

}
