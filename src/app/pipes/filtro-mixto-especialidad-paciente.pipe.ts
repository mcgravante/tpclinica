import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroMixtoEspecialidadPaciente'
})
export class FiltroMixtoEspecialidadPacientePipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => (item.pacienteNombre.indexOf(filter) !== -1) || (item.especialidad.indexOf(filter) !== -1));
  }

}
