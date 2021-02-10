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
<<<<<<< HEAD
  constructor(public familyService: FamilyService, public router: Router) { }

  ngOnInit(): void {
=======
  model2:Date;
  constructor(public userService: UsersService, public router: Router) { }

  ngOnInit(){
    this.model2 = new Date();
    $('[rel="tooltip"]').tooltip();

    var tagClass = $('.tagsinput').data('color');

    if ($(".tagsinput").length != 0) {
      $('.tagsinput').tagsinput();
    }

    $('.bootstrap-tagsinput').addClass('' + tagClass + '-badge');

    //  Init Bootstrap Select Picker
    if ($(".selectpicker").length != 0) {
      $(".selectpicker").selectpicker({
        iconBase: "nc-icon",
        tickIcon: "nc-check-2"
      });
    }

    if ($(".datetimepicker").length != 0) {
      $('.datetimepicker').datetimepicker({
        icons: {
          time: "fa fa-clock-o",
          date: "fa fa-calendar",
          up: "fa fa-chevron-up",
          down: "fa fa-chevron-down",
          previous: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          today: 'fa fa-screenshot',
          clear: 'fa fa-trash',
          close: 'fa fa-remove'
        },
        debug: true
      });
    }
  }
  getStatusDescription(statusId: string) {
    if (statusId === '1') {
      return 'Active';
    } else {
      return 'Inactive';
    }
  }
>>>>>>> origin/service_record

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
  //test