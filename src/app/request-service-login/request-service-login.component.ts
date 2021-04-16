import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ServicesService } from '../services.service';
import { BusinessService } from '../business.service';
import { FamilyService } from '../family.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ServiceModel } from 'app/service.model';

declare var $: any;
@Component({
  selector: 'app-request-service',
  templateUrl: './request-service-login.component.html',
  styleUrls: ['./request-service-login.component.css'],
  providers: [DatePipe]
})
export class RequestServiceLoginComponent implements OnInit {

  public errorInForm: boolean;
  public categoryList: [];
  public serviceList: [];
  public family;
  public requestedServices: any = [];
  public requestList: any = [];


  public submitted = false;
  constructor(public familyService: FamilyService, public router: Router) {

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
      this.familyService.getFamilyByEmail(form.value.email).subscribe((responseData) => {
        if(!responseData) {
          Swal.fire({
            title: "Email not found!",
            text: "This email address was not found in our system. Please double-check your entry, and if the problem persists, email us directly.",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "error"
          })
        }
        else {
          this.family = responseData.results[0]['id'],
          this.router.navigate(['/request'], { queryParams: { familyId: this.family } });
        }
      })
    }
  }
}
