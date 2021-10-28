import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEspecialistas'
})
export class FiltroEspecialistasPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => (item.nombre.indexOf(filter) !== -1) || (item.apellido.indexOf(filter) !== -1));
  }

}
