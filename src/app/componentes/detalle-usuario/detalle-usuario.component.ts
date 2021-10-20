import { Component, Input, OnInit } from '@angular/core';
import { Administrador } from 'src/app/clases/administrador';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent implements OnInit {
  @Input() administrador: Administrador = null;
  @Input() especialista: Especialista = null;
  @Input() paciente: Paciente = null;

  constructor() { }

  ngOnInit(): void {
  }
}
