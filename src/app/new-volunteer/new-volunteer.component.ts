import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import Swal from 'sweetalert2';
import { UserModel } from '../user.model';
import { rejects } from 'assert';

declare var $: any;
@Component({
  selector: 'app-new-volunteer',
  templateUrl: './new-volunteer.component.html',
  styleUrls: ['./new-volunteer.component.css']
})
export class NewVolunteerComponent implements OnInit {

  public md5 = new Md5();
  public volunteerId: number;
  public user: UserModel;
  errorInForm: boolean;
  passwordMatch: boolean;
  public viewMode: boolean;
  public editMode: boolean;
  public creationMode: boolean;

  constructor(public userService: UsersService, public router: Router, private activeRoute: ActivatedRoute) {
    const tree: UrlTree = router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;

    if (s[1].path === 'new') {
      this.creationMode = true;
    }
    if (s[1].path === 'view') {
      this.viewMode = true;
    }
    if (s[1].path === 'edit') {
      this.editMode = true;
    }

    this.activeRoute.queryParams.subscribe(params => {
      this.volunteerId = params['volunteerId'];
    });
    if (this.volunteerId) {
      this.userService.getVolunteerById(this.volunteerId).subscribe((responseData) => {
        if (responseData) {
          this.user = responseData.results[0];
        }
      });
    }
  }

  ngOnInit(): void {
  }

  getStatusDescription(statusId: string) {
    if (statusId === '1') {
      return 'Active';
    } else {
      return 'Inactive';
    }
  }

  getStatusID(statusDescription: string) {
    if (statusDescription == 'Active') {
      return 1;
    } else {
      return 2;
    }
  }

  getRoleDescription(roleId: string) {
    if (roleId === '1') {
      return 'Administrator';
    } else {
      return 'Volunteer';
    }
  }

  getRoleId(roleDescription: string) {
    if (roleDescription == 'Administrator') {
      return 1;
    } else {
      return 2;
    }
  }

  getEducationId(educationDescription: string) {
    if (educationDescription === 'Primary School') {
      return '1';
    }
    if (educationDescription === 'High School') {
      return '2';
    }
    if (educationDescription === 'Technical School') {
      return '3';
    }
    if (educationDescription === 'Some College') {
      return '4';
    }
    if (educationDescription === 'College Graduate') {
      return '5';
    }
    if (educationDescription === 'Masters Degree') {
      return '6';
    }
    if (educationDescription === 'Doctorate') {
      return '7';
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
    } else {
      if (this.creationMode) { // Creating New Record
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
            role: form.value.role,
            status: form.value.status,
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
                title: 'Record Saved Successfully!',
                text: 'The volunteer was created successfully.',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success',
                type: 'success'
              })
              this.router.navigate(['/volunteers']);
            }
          });
        } else {
          this.passwordMatch = false;
        }
      }

      if (this.editMode) { // Editing Existing Record
        const user: any = {
          id: this.volunteerId,
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          username: form.value.username,
          email: form.value.email,
          address: form.value.address,
          homePhone: form.value.homePhone,
          cellPhone: form.value.cellPhone,
          workPhone: form.value.workPhone,
          education: form.value.education,
          licenses: form.value.licenses,
          availability: form.value.availability,
          role: form.value.role,
          status: form.value.status,
          driversLicense: form.value.driversLicense,
          socialSecurity: form.value.socialSecurity,
          emergencyFirstName: form.value.emergencyFirstName,
          emergencyLastName: form.value.emergencyLastName,
          emergencyEmail: form.value.emergencyEmail,
          emergencyPhone: form.value.emergencyPhone,
          emergencyAddress: form.value.emergencyAddress
        };

        this.userService.editUser(user).subscribe((responseData) => {
          if (responseData.userUpdated) {
            Swal.fire({
              title: 'Record Updated Successfully!',
              text: 'The volunteer was updated successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              type: 'success'
            })
            this.router.navigate(['/volunteers']);
          }
        });
      }
    }
  }

  changePassword() {
    Swal.fire({
      title: 'Password Change',
      html: '<div class="form-group">' +
            '<label for="password">New Password</label>' +
            '<input id="password" type="password" class="form-control" />' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="confirmPassword">Confirm New Password</label>' +
            '<input id="confirmPassword" type="password" class="form-control" />' +
            '</div>',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      allowOutsideClick: false,
      allowEscapeKey : false,
      preConfirm: function() {
        return new Promise(function(resolve) {
          if (!$('#password').val()) {
            Swal.showValidationMessage('Enter a valid password.');
            resolve();
          } else {
            if (!$('#confirmPassword').val()) {
              Swal.showValidationMessage('Confirm password.');
              resolve();
            } else {
              if ($('#confirmPassword').val() !== $('#password').val()) {
                Swal.showValidationMessage('Passwords must match.');
                resolve();
              } else {resolve(); }
            }
          }
        });
      }
    }).then((result) => {
        if (result.value) { // OK button clicked
          const md5 = new Md5();
          const passwordHash = md5.appendStr($('#password').val()).end();
          this.userService.changePassword(passwordHash, this.volunteerId).subscribe((responseData) => {
            if (responseData.userUpdated) {
              Swal.fire({
                type: 'success',
                text: 'Password changed successfully.',
                confirmButtonClass: 'btn btn-info',
                buttonsStyling: false
              })
            }
          });


        } else {
          Swal.fire({
            type: 'info',
            text: 'Password change cancelled.',
            confirmButtonClass: 'btn btn-info',
            buttonsStyling: false
        })
        }
      })
  }
}
