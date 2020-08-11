import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  transform(value: Object): { name: string, value: number }[] {
    return Object.keys(value).filter(e => !isNaN(+e)).map(o => { return { name: value[o], value: +o } });
  }

}
