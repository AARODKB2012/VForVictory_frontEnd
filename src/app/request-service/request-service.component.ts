import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ServicesService } from '../services.service';
import { BusinessService } from '../business.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ServiceModel } from 'app/service.model';

declare var $: any;
@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css'],
  providers: [DatePipe]
})
export class RequestServiceComponent implements OnInit {

  public errorInForm: boolean;
  public categoryList: [];
  public serviceList: [];
  public requestedServices: any = [];
  public requestList: any = [];
  public currentDate = new Date();
  public today;
  public submitted = false;
  constructor(public serviceService: ServicesService, public businessService: BusinessService, public router: Router, private datePipe: DatePipe) {
    this.today = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
   }

  ngOnInit(): void {
    this.serviceService.getAllCategories().subscribe((responseData) => {
      if (responseData) {
        this.categoryList = responseData.results;
      }
    });
    this.businessService.getActiveBusinesses().subscribe((responseData) => {
      if (responseData) {
        this.serviceList = responseData.results;
      }
    });
  }

  onSave(form: NgForm) {

    if ( form.invalid ) { // Validating form has data
      alert(form.value.notes);
      console.log('returned');
      this.errorInForm = true;
      return;
    }
    else {
      this.requestedServices.push(form.value.req1, form.value.req2, form.value.req3);

      for(var i = 0; i < this.requestedServices.length; i++){
        var currentRequest = this.requestedServices[i];

        if(currentRequest != null || currentRequest != "") {
          this.serviceService.getServiceById(currentRequest).subscribe((responseData) => {
            if (responseData) {
              const request: any = {
                name: form.value.familyName,
                email: form.value.email,
                businessName: responseData.results[0].business_name.toString(),
                businessCategory: responseData.results[0].business_category.toString(),
                dateRequested: this.today,
                notes: form.value.notes
              };
              this.serviceService.saveRequest(request).subscribe((reqResponseData) => {
                if (reqResponseData.requestCreated) {
                  this.submitted = true;
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
          });
        }
      }
    }
  }
}
