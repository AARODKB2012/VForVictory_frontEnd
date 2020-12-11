import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css']
})
export class RequestServiceComponent implements OnInit {
private md5 = new Md5();
  errorInForm: boolean;
  passwordMatch: boolean;
  constructor(public serviceService: ServicesService, public router: Router) { }

  ngOnInit(): void {

  }

  onSave(form: NgForm) {
    if ( form.invalid ) { // Validating form has data
      console.log('returned');
      this.errorInForm = true;
      return;
    }
    else {
      const request: any = {
        familyName: form.value.familyName,
        businessCategory: form.value.businessCategory,
        dateRequested: form.value.dateRequested
      };
      this.serviceService.saveRequest(request).subscribe((responseData) => {
        if (responseData.requestCreated) {
          Swal.fire({
            title: "Request Submitted!",
            text: "Your request for service was submitted successfully.  Thank you!",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success"
          })
        }
      });
    }
  }
}
