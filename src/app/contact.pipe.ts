import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contact'
})
export class ContactPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(typeof value === 'undefined' || value === null) {
      return "Not Stated";
    }
    else if(value == 'phone') {
      return "Phone Call";
    }
    else if(value == 'email') {
      return "Email";
    }
    else if(value == 'text') {
      return "Text Message";
    }
    else if(value == 'voucher') {
      return "Voucher/Gift Card";
    }
  }

}
