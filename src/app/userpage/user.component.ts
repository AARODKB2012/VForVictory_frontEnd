import { environment } from 'environments/environment';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { UserModel } from 'app/user.model';
import { UsersService } from 'app/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

declare var $: any;
@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent{
    public fullName: string;
    public username: string = null;
    public userId: number;
    public profilePictureURL: string = null;
    public user: UserModel;
    public educationLevelList: [];
    public roleList: [];
    private md5 = new Md5();
    public errorInForm: boolean;
    public fileToUpload: File = null;
    constructor(public userService: UsersService, public router: Router, private activeRoute: ActivatedRoute) {
        this.activeRoute.queryParams.subscribe(params => {
            this.userId = params['id'];
        });
        if (this.userId) {
            this.userService.getVolunteerById(this.userId).subscribe((responseData) => {
              if (responseData) {
                this.user = responseData.results[0];
              }
            });
          }

        this.fullName = JSON.parse(localStorage.getItem('currentUser')).first_name + ' ' +
        JSON.parse(localStorage.getItem('currentUser')).last_name;
        
        if (JSON.parse(localStorage.getItem('currentUser')).profile_picture_url){
            this.username = JSON.parse(localStorage.getItem('currentUser')).username;
            this.profilePictureURL = environment.backendURL + `api/volunteer/username/${this.username}/profile/picture`;
        }
    }

    ngOnInit() {
        this.userService.getAllEducations().subscribe((responseData) => {
            if (responseData) {
              this.educationLevelList = responseData.results;
            }
        });
        this.userService.getAllRoles().subscribe((responseData) => {
            if (responseData) {
              this.roleList = responseData.results;
            }
        });
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
            return new Promise<void>(function(resolve) {
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
              this.userService.changePassword(passwordHash, this.userId).subscribe((responseData) => {
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

    
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    //console.log(this.fileToUpload);
  }

    onSave(form: NgForm) {
        if ( form.invalid ) {
          console.log('returned');
          this.errorInForm = true;
          return;
        } else {
            const user: any = {
            id: this.userId,
            firstName: form.value.firstName,
            lastName: form.value.lastName,
            username: form.value.username,
            email: form.value.email,
            address: form.value.address,
            homePhone: form.value.homePhone,
            cellPhone: form.value.cellPhone,
            workPhone: form.value.workPhone,
            education: this.user['educational_background'], // This way the value is set in the DB without reading the field in the from
            licenses: form.value.licenses,
            availability: form.value.availability,
            role: this.user['role'],
            status: this.user['status'],
            driversLicense: form.value.driversLicense,
            socialSecurity: form.value.socialSecurity,
            emergencyFirstName: form.value.emergencyFirstName,
            emergencyLastName: form.value.emergencyLastName,
            emergencyEmail: form.value.emergencyEmail,
            emergencyPhone: form.value.emergencyPhone,
            emergencyAddress: form.value.emergencyAddress,
            profilePicture: this.fileToUpload
            };
    
            this.userService.editUser(user).subscribe((responseData) => {
                if (responseData.userUpdated) {
                    if (this.fileToUpload!=null){
                        this.userService.updateProfilePicture(this.fileToUpload,  form.value.username).subscribe((responseData) => {
                          if (responseData.userUpdated) {
                            console.log("User updated: " + responseData.userUpdated);
                            // TODO: When the user does not have profile picture and a picture is added, the picture does not load. 
                            // This is because the app is using the currentUser object from the localstorage and it has null on the profile url
                            // set this value to the new uploaded picture url so it works as it should. 
                            // otherwise the user will have to log out and log back in for the picture to laod since when logging in we get the picture url back.
                            // The same happens for any of the other values that are taken form the currentUser object, like name, last name, etc
                        }
                        });
                      }
                    Swal.fire({
                        title: 'Record Updated Successfully!',
                        text: 'The volunteer was updated successfully.',
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success',
                        type: 'success'
                    })
                }
            });
        }
    }
}
