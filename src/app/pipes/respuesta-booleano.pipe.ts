import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'respuestaBooleano'
})
export class RespuestaBooleanoPipe implements PipeTransform {

  transform(bool: boolean): string {
    if (bool) {
      return 'Si'
    }
    else {
      return 'No'
    }
  }

}
