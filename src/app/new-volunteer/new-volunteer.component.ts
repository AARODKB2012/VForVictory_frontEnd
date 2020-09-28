import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-new-volunteer',
  templateUrl: './new-volunteer.component.html',
  styleUrls: ['./new-volunteer.component.css']
})
export class NewVolunteerComponent implements OnInit {

  private md5 = new Md5();
  errorInForm: boolean;
  passwordMatch: boolean;
  constructor(public userService: UsersService, public router: Router) { }

  ngOnInit(): void {
  }

  getStatusDescription(statusId: string) {
    if (statusId === '1') {
      return 'Active';
    } else {
      return 'Inactive';
    }
  }

  getRoleDescription(roleId: string) {
    if (roleId === '1') {
      return 'Administrator';
    } else {
      return 'Volunteer';
    }
  }
  confirmPassword(password: string, confirmPassword: string) {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  onSave(form: NgForm) {
    if ( form.invalid ) { // Validating form has data
      console.log('returned');
      this.errorInForm = true;
      return;
    }
    if (this.confirmPassword(form.value.password, form.value.confirmPassword)) {
      this.passwordMatch = false;
      const user: any = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        username: form.value.username,
        password: this.md5.appendStr(form.value.password).end(),
        email: form.value.email,
        address: form.value.address,
        homePhone: form.value.homePhone,
        cellPhone: form.value.cellPhone,
        workPhone: form.value.workPhone,
        education: form.value.education,
        licenses: form.value.licenses,
        availability: form.value.availability,
        role: this.getRoleDescription(form.value.role),
        status: this.getStatusDescription(form.value.status),
        driversLicense: form.value.driversLicense,
        socialSecurity: form.value.socialSecurity,
        emergencyFirstName: form.value.emergencyFirstName,
        emergencyLastName: form.value.emergencyLastName,
        emergencyEmail: form.value.emergencyEmail,
        emergencyPhone: form.value.emergencyPhone,
        emergencyAddress: form.value.emergencyAddress
      };
      this.userService.saveUser(user).subscribe((responseData) => {
        if (responseData.userCreated) {
          Swal.fire({
            title: "Record Saved Successfully!",
            text: "The volunteer was created successfully.",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success"
          })
          this.router.navigate(['/volunteers']);
        }
    });
    } else {
      this.passwordMatch = false;
    }
  }
}
