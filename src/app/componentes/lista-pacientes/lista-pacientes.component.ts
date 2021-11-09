import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { PacienteService } from 'src/app/servicios/paciente.service';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {
  @Output() seSeleccionoPaciente: EventEmitter<any> = new EventEmitter<any>();

  arrayPacientes: Paciente[] = [];
  filter: string = '';


  constructor(public pacienteService: PacienteService) {
  }

  ngOnInit() {
    this.pacienteService.getPacientes().subscribe((pacientes: any) => {
      let listaPacientes: Paciente[] = [];
      for (let index = 0; index < pacientes.length; index++) {
        const paciente = pacientes[index];
        listaPacientes.push(paciente.payload.doc.data());
      }
      this.arrayPacientes = listaPacientes;
    })
  }

  seleccionarPaciente(paciente: Paciente) {
    this.seSeleccionoPaciente.emit(paciente);
  }

}
