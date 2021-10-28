import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {
  turnoSeleccionado: Turno;


  constructor() { }

  ngOnInit(): void {
  }

  mostrar(turno: Turno) {
    this.turnoSeleccionado = turno;
  }

}
