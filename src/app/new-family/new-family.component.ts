import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import Swal from 'sweetalert2';
import { FamilyService } from 'app/family.service';

declare var $: any;
@Component({
  selector: 'app-new-family',
  templateUrl: './new-family.component.html',
  styleUrls: ['./new-family.component.css']
})
export class NewFamilyComponent implements OnInit {

  private md5 = new Md5();
  errorInForm: boolean;
  passwordMatch: boolean;
  constructor(public familyService: FamilyService, public router: Router) { }

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
      this.familyService.saveFamily(request).subscribe((responseData) => {
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