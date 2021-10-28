import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.scss']
})
export class TurnosPacienteComponent implements OnInit {
  turnoSeleccionado:Turno;

  constructor() { }

  ngOnInit(): void {
  }

  mostrar(turno:Turno){
    this.turnoSeleccionado=turno;
  }

}
