import { Component, OnInit } from '@angular/core';
import { FamilyService } from 'app/family.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-family-application',
  templateUrl: './family-application.component.html',
  styleUrls: ['./family-application.component.css'],
  providers: [DatePipe]
})
export class FamilyApplicationComponent implements OnInit {

  public errorInForm: boolean;
  public serviceList: [];
  public requestedFamily: any = [];
  public requestList: any = [];
  public currentDate = new Date();
  public today;
  public submitted = false;


  constructor(public familyApplication: FamilyService, public router: Router, private datePipe: DatePipe) { 
    this.today = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
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
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        phoneNumber: form.value.phonenumber,
        streetAddress: form.value.address,
        zipcode: form.value.zipcode,
        email: form.value.email,
        cancerWarriorname: form.value.cancerwarrior,
        workPhone: form.value.workPhone,
        relationshipTowarrior: form.value.relationship,
        additionalInfo: form.value.addInfo,
        endOftreatmentDate: form.value.endOftreatmentDate
        };
      this.familyApplication.saveFamily(request).subscribe((responseData) => {
        if (responseData.familyCreated) {
          Swal.fire({
            title: "Record Saved Successfully!",
            text: "The family was created successfully.",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success"
          })
        }
    });
    } 
    }

}
