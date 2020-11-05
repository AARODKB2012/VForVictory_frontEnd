import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import { map } from 'rxjs/operators';
import {environment} from '../environments/environment';
import { UserModel } from './user.model';
import { UserAPIResponse } from './response.model';

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
}
