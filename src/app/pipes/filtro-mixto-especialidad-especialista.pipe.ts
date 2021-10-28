import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroMixtoEspecialidadEspecialista'
})
export class FiltroMixtoEspecialidadEspecialistaPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => (item.especialistaNombre.indexOf(filter) !== -1) || (item.especialidad.indexOf(filter) !== -1));
  }

}
