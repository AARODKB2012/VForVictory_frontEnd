import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNoActive'
})
export class YesNoActivePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? "Active" : "Inactive";
  }

}