import { Pipe, PipeTransform } from '@angular/core';
import { HistoriaClinica } from '../clases/historia-clinica';
import { Turno } from '../clases/turno';
import { HistoriasClinicasService } from '../servicios/historias-clinicas.service';

@Pipe({
  name: 'filtroTurno'
})
export class FiltroTurnoPipe implements PipeTransform {
  historias: HistoriaClinica[];

  constructor(public historiasService: HistoriasClinicasService) {
    this.historias = this.historiasService.historias;
  }


  transform(turnos: Turno[], filter: string): any {
    if (!turnos || !filter) {
      return turnos;
    }
    let historiasFiltradas = this.historias.filter(historia => (
      historia.altura.toString().indexOf(filter) !== -1)
      || (historia.peso.toString().indexOf(filter) !== -1)
      || (historia.clave1.toString().indexOf(filter) !== -1)
      || (historia.clave2.toString().indexOf(filter) !== -1)
      || (historia.clave3.toString().indexOf(filter) !== -1)
      || (historia.fecha.toString().indexOf(filter) !== -1)
      || (historia.presion.toString().indexOf(filter) !== -1)
      || (historia.temperatura.toString().indexOf(filter) !== -1)
      || (historia.valor1.toString().indexOf(filter) !== -1)
      || (historia.valor2.toString().indexOf(filter) !== -1)
      || (historia.valor3.toString().indexOf(filter) !== -1)
    );

    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return turnos.filter(turno => (
      turno.pacienteNombre.indexOf(filter) !== -1)
      || (turno.especialistaMail.indexOf(filter) !== -1)
      || (turno.especialidad.indexOf(filter) !== -1)
      || (turno.calificacion.indexOf(filter) !== -1)
      || (turno.encuesta.indexOf(filter) !== -1)
      || (turno.especialistaNombre.indexOf(filter) !== -1)
      || (turno.estado.indexOf(filter) !== -1)
      || (turno.fecha.toString().indexOf(filter) !== -1)
      || (turno.pacienteMail.indexOf(filter) !== -1)
      || (turno.pacienteNombre.indexOf(filter) !== -1)
      || (turno.resenia.indexOf(filter) !== -1)
      || (historiasFiltradas.find(historia => {
        return historia.paciente === turno.pacienteMail
      })
      ));
  }

}
