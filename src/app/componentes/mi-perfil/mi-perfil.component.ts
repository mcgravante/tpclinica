import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/clases/administrador';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {
  administrador: Administrador;
  paciente: Paciente;
  especialista: Especialista;

  constructor() { }

  ngOnInit(): void {
    let user: any = JSON.parse(localStorage.getItem('loggedUser'));
    if (user.tipo == 'administrador') {
      this.administrador = user;
    } else if (user.tipo == 'especialista') {
      this.especialista = user;
    } else if (user.tipo == 'paciente') {
      this.paciente = user;
    }
  }

}
