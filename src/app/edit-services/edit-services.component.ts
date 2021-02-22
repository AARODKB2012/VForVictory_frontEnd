import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import Swal from 'sweetalert2';
import { ServiceModel } from 'app/service.model';

declare var $: any;
@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.css']
})
export class EditServicesComponent implements OnInit {

  private md5 = new Md5();
  public serviceId: number;
  public service: ServiceModel;
  errorInForm: boolean;
  passwordMatch: boolean;

  constructor(public serviceService: ServicesService, public router: Router, private activeRoute: ActivatedRoute) {

    this.activeRoute.queryParams.subscribe(params => {
      this.serviceId = params['id'];
    });
    if (this.serviceId) {
      this.serviceService.getRequestById(this.serviceId).subscribe((responseData) => {
        if (responseData) {
          this.service = responseData.results[0];
        }
      });
    }
  }

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
        notifiedBusiness: form.value.businessContacted,
        notifiedFamily: form.value.familyContacted,
        active: form.value.active
      };
      this.serviceService.saveRequest(request).subscribe((responseData) => {
        if (responseData.requestCreated) {
          Swal.fire({
            title: "Request updated!",
            text: "Your request for service was updated successfully.  Thank you!",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success"
          })
        }
      });
    }
  }
}