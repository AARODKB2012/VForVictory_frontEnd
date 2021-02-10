import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import { map } from 'rxjs/operators';
import {environment} from '../environments/environment';
import { UserModel } from './user.model';
import { UserAPIResponse } from './response.model';
import { FamilyAPIResponse } from './family_response.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private usersList: any = [];
  private serverAddress = environment.backendURL;
  constructor(private httpClient: HttpClient, private router: Router, private http: Http) { }

  saveUser(user: any) {
    return this.httpClient.post<{userCreated: boolean}>(this.serverAddress + 'api/volunteer/new', user);
  }

  listUsers(): any {
    return this.httpClient.get<UserAPIResponse>(this.serverAddress + 'api/volunteer/');
  }

  listVolunteerByStatus(status: string) {
    return this.httpClient.get<UserAPIResponse>(this.serverAddress + 'api/volunteer/status/' + status);
  }

  getAllVolunteersBySearchValue(searchValue: string) {
    return this.httpClient.get<UserAPIResponse>(this.serverAddress + 'api/volunteer/search/' + searchValue);
  }

  getVolunteerById(volunteerId: Number) {
    return this.httpClient.get<UserAPIResponse>(this.serverAddress + 'api/volunteer/id/' + volunteerId);
  }

  editUser(user: any) {
    return this.httpClient.post<{userUpdated: boolean}>(this.serverAddress + 'api/volunteer/edit', user);
  }

  changePassword(passwordHash, volunteerId) {
    return this.httpClient.post<{userUpdated: boolean}>(this.serverAddress + 'api/volunteer/change_password/'
    +  passwordHash + '/' + volunteerId, null);
  }

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/service_record
  updateProfilePicture(profilePicture: File, username) {
    const formData: FormData = new FormData();
    formData.append('fileKey', profilePicture, profilePicture.name);
    return this.httpClient.post<{userUpdated: boolean}>(this.serverAddress + 'api/volunteer/picture/' + username, formData);
  }

<<<<<<< HEAD
=======
=======
>>>>>>> 030d892982257ae390b5eb53aa07cbce9df585ec
>>>>>>> origin/service_record
  getVolunteerByEmail(volunteerEmail: String) {
    return this.httpClient.get(this.serverAddress + 'api/volunteer/email/' + volunteerEmail, {observe: 'response'});
  }

  getVolunteerByUsername(username: String) {
    return this.httpClient.get(this.serverAddress + 'api/volunteer/username/' + username, {observe: 'response'});
  }

  getAllEducations(): any {
    return this.httpClient.get<UserAPIResponse>(this.serverAddress + 'api/volunteer/education/');
  }

  getAllRoles(): any {
    return this.httpClient.get<UserAPIResponse>(this.serverAddress + 'api/volunteer/role/');
  }
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

>>>>>>> 030d892982257ae390b5eb53aa07cbce9df585ec
>>>>>>> origin/service_record
}
