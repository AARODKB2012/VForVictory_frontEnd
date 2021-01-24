import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import { map } from 'rxjs/operators';
import {environment} from '../environments/environment';
import { UserModel } from './user.model';
import { UserAPIResponse } from './response.model';
import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private usersList: any = [];
  private response: UserAPIResponse;
  private serverAddress = environment.backendURL;

  // tslint:disable-next-line: deprecation
  constructor(private httpClient: HttpClient, private router: Router, private http: Http) {}

  getUser(username: string, password: string) {
    const md5 = new Md5();
    const hashedPasswrod = md5.appendStr(password).end();
    return this.httpClient.get<UserAPIResponse>(this.serverAddress + 'api/volunteer/' + username + '/password/' + hashedPasswrod);
  }

  getCurrentUser(username: string) {
    return this.httpClient.get<UserAPIResponse>(this.serverAddress + 'api/volunteer/current/' + username);
  }

  postLoginHistory(loginHistory) {
    return this.httpClient.post<{sessionSaved: Boolean}>(this.serverAddress + 'api/volunteer/login/new/', loginHistory);
  }

  getIPAddress(){
    return this.httpClient.get<{ipObject: string}>("http://api.ipify.org/?format=json");
  }

  getLoginHistory(userId: number) {
    return this.httpClient.get<{loginHistory: any}>(this.serverAddress + 'api/volunteer/login/history/' + userId);
  }
}
