import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-turnos-especialista',
  templateUrl: './turnos-especialista.component.html',
  styleUrls: ['./turnos-especialista.component.scss']
})
export class TurnosEspecialistaComponent implements OnInit {
  turnoSeleccionado: Turno;


  constructor() { }

  ngOnInit(): void {
  }

  mostrar(turno: Turno) {
    this.turnoSeleccionado = turno;
  }

}
