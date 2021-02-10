import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import Swal from 'sweetalert2';
import { UserModel } from '../user.model';
import { rejects } from 'assert';
<<<<<<< HEAD
import { environment } from 'environments/environment';
=======
<<<<<<< HEAD
import { environment } from 'environments/environment';
=======
>>>>>>> 030d892982257ae390b5eb53aa07cbce9df585ec
>>>>>>> origin/service_record

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
  emailInUser: boolean;
  usernameInUse: boolean;
  public viewMode: boolean;
  public editMode: boolean;
  public creationMode: boolean;
  public educationLevelList: [];
  public roleList: [];
<<<<<<< HEAD
  public fileToUpload: File = null;
  public profileURL: string = null;
=======
<<<<<<< HEAD
  public fileToUpload: File = null;
  public profileURL: string = null;
=======
>>>>>>> 030d892982257ae390b5eb53aa07cbce9df585ec
>>>>>>> origin/service_record

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
<<<<<<< HEAD
          if (responseData.results[0]['profile_picture_url'] != null){
            this.profileURL = environment.backendURL + `api/volunteer/username/${responseData.results[0]['username']}/profile/picture`
          }
=======
<<<<<<< HEAD
          if (responseData.results[0]['profile_picture_url'] != null){
            this.profileURL = environment.backendURL + `api/volunteer/username/${responseData.results[0]['username']}/profile/picture`
          }
=======
>>>>>>> 030d892982257ae390b5eb53aa07cbce9df585ec
>>>>>>> origin/service_record
        }
      });
    }
  }

  ngOnInit(): void {
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



  confirmPassword(password: string, confirmPassword: string) {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  validateEmail(email: string) {
    let validEmail: boolean;
    this.userService.getVolunteerByEmail(email).subscribe((response) => {
      console.log(response);
      if (response.status === 200) { // Email is in use
        validEmail = false;
      } else {
        validEmail = true;
      }
    });
    return validEmail;
  }

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/service_record
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    //console.log(this.fileToUpload);
  }

<<<<<<< HEAD
=======
=======
>>>>>>> 030d892982257ae390b5eb53aa07cbce9df585ec
>>>>>>> origin/service_record
  onSave(form: NgForm) {
    if ( form.invalid ) {
      console.log('returned');
      this.errorInForm = true;
      return;
    } else {
      if (this.creationMode) { // Creating New Record
        if (this.confirmPassword(form.value.password, form.value.confirmPassword)) {
            this.passwordMatch = true;
            this.userService.getVolunteerByEmail(form.value.email).subscribe((response) => {
              if (response.status === 200) { // Email is in use
                this.emailInUser = true;
              } else {
                this.userService.getVolunteerByUsername(form.value.username).subscribe((responseUserName) => {
                  console.log(responseUserName);
                  if (responseUserName.status === 200) { // Username is in use
                    this.usernameInUse = true;
                  } else {
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/service_record

                    this.userService.saveUser(user).subscribe((responseData) => {
                      if (responseData.userCreated) {
                        if (this.fileToUpload!=null){
                          this.userService.updateProfilePicture(this.fileToUpload, form.value.username).subscribe((responseData) => {
                            if (responseData.userUpdated) {
                              console.log("User updated: " + responseData.userUpdated);
                            }
                          });
                        }
<<<<<<< HEAD
=======
=======
                    this.userService.saveUser(user).subscribe((responseData) => {
                      if (responseData.userCreated) {
>>>>>>> 030d892982257ae390b5eb53aa07cbce9df585ec
>>>>>>> origin/service_record
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
                  }
                })
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
<<<<<<< HEAD
          emergencyAddress: form.value.emergencyAddress,
          profilePicture: this.fileToUpload
=======
<<<<<<< HEAD
          emergencyAddress: form.value.emergencyAddress,
          profilePicture: this.fileToUpload
=======
          emergencyAddress: form.value.emergencyAddress
>>>>>>> 030d892982257ae390b5eb53aa07cbce9df585ec
>>>>>>> origin/service_record
        };

        this.userService.editUser(user).subscribe((responseData) => {
          if (responseData.userUpdated) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/service_record
            if (this.fileToUpload!=null){
              this.userService.updateProfilePicture(this.fileToUpload,  form.value.username).subscribe((responseData) => {
                if (responseData.userUpdated) {
                  console.log("User updated: " + responseData.userUpdated);
                }
              });
            }
<<<<<<< HEAD
=======
=======
>>>>>>> 030d892982257ae390b5eb53aa07cbce9df585ec
>>>>>>> origin/service_record
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
