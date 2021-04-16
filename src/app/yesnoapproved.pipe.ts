import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNoApproved'
})
export class YesNoApprovedPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(typeof value === 'undefined' || value === null) {
      return "Pending";
    }
    else{
      return "Approved";
    }
  }

}