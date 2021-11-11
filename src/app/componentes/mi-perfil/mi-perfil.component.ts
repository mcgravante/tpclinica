import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/clases/administrador';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { EspecialistaService } from 'src/app/servicios/especialista.service';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {
  administrador: Administrador;
  paciente: Paciente;
  especialista: Especialista;
  especialistaSeleccionado: Especialista;

  arrayMisEspecialistas: Especialista[] = [];
  filter: string = '';

  constructor(public turnosService: TurnosService, public especialistaService: EspecialistaService) {
  }

  ngOnInit(): void {
    let user: any = JSON.parse(localStorage.getItem('loggedUser'));
    if (user.tipo == 'administrador') {
      this.administrador = user;
    } else if (user.tipo == 'especialista') {
      this.especialista = user;
    } else if (user.tipo == 'paciente') {
      this.paciente = user;
      this.turnosService.getTurnosFinalizadosByPaciente(user.mail).subscribe((turnos: any) => {
        let listaMailsEspecialistas: string[] = [];
        for (let index = 0; index < turnos.length; index++) {
          let turno = turnos[index].payload.doc.data();
          listaMailsEspecialistas.push(turno.especialistaMail);
        }
        let listaMisEspecialistas: Especialista[] = [];
        this.especialistaService.getEspecialistasByList(listaMailsEspecialistas).subscribe((especialistas: any) => {
          for (let index = 0; index < especialistas.length; index++) {
            let especialista = especialistas[index].payload.doc.data();
            listaMisEspecialistas.push(especialista);
          }
          this.arrayMisEspecialistas = listaMisEspecialistas;
        })
      })

    }
  }

  seleccionarEspecialista(especialista: Especialista) {
    this.especialistaSeleccionado = especialista;
  }

}
