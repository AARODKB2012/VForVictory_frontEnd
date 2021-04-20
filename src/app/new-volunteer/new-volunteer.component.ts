import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import Swal from 'sweetalert2';
import { UserModel } from '../user.model';
import { rejects } from 'assert';
import { environment } from 'environments/environment';

declare var $: any;
@Component({
  selector: 'app-new-volunteer',
  templateUrl: './new-volunteer.component.html',
  styleUrls: ['./new-volunteer.component.css']
})
export class NewVolunteerComponent implements OnInit {

  public md5 = new Md5();
  public volunteerId: number;
  private loggedInUser: any;
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
  public fileToUpload: File = null;
  public profileURL: string = null;
  public userId: number;
  public ownAccount = false;

  constructor(public userService: UsersService, public router: Router, private activeRoute: ActivatedRoute) {
    const tree: UrlTree = router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.userId = JSON.parse(localStorage.getItem('currentUser')).record_id;

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
      if(this.volunteerId == this.userId) {
        this.ownAccount = true;
      }
      this.userService.getVolunteerById(this.volunteerId).subscribe((responseData) => {
        if (responseData) {
          this.user = responseData.results[0];
          if (responseData.results[0]['profile_picture_url'] != null){
            this.profileURL = environment.backendURL + `api/volunteer/username/${responseData.results[0]['username']}/profile/picture`
          }
        }
      });
    }

    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser')).email;
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    //console.log(this.fileToUpload);
  }

  formatPhoneNumber(phoneNumber: String) {
    if (!phoneNumber) { return ''; }

    var value = phoneNumber.toString().trim().replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
        return phoneNumber;
    }

    var country, city, number;

    switch (value.length) {
        case 10: // +1PPP####### -> C (PPP) ###-####
            country = 1;
            city = value.slice(0, 3);
            number = value.slice(3);
            break;

        case 11: // +CPPP####### -> CCC (PP) ###-####
            country = value[0];
            city = value.slice(1, 4);
            number = value.slice(4);
            break;

        case 12: // +CCCPP####### -> CCC (PP) ###-####
            country = value.slice(0, 3);
            city = value.slice(3, 5);
            number = value.slice(5);
            break;

        default:
            return phoneNumber;
    }

    if (country == 1) {
        country = "";
    }

    number = number.slice(0, 3) + '-' + number.slice(3);

    return (country + " (" + city + ") " + number).trim();
  };

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
                      emergencyAddress: form.value.emergencyAddress,
                      createdBy: this.loggedInUser
                    };

                    this.userService.saveUser(user).subscribe((responseData) => {
                      if (responseData.userCreated) {
                        if (this.fileToUpload!=null){
                          this.userService.updateProfilePicture(this.fileToUpload, form.value.username).subscribe((responseData) => {
                            if (responseData.userUpdated) {
                              console.log("User updated");
                            }
                          });
                        }
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
          emergencyAddress: form.value.emergencyAddress,
          profilePicture: this.fileToUpload,
          updatedBy: this.loggedInUser
        };

        this.userService.editUser(user).subscribe((responseData) => {
          if (responseData.userUpdated) {
            if (this.fileToUpload!=null){
              this.userService.updateProfilePicture(this.fileToUpload,  form.value.username).subscribe((responseData) => {
                if (responseData.userUpdated) {
                  console.log("User updated: " + responseData.userUpdated);
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
