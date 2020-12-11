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

export class EmailService {
    private serverAddress = environment.backendURL;
    constructor(private httpClient: HttpClient, private router: Router, private http: Http) { }

    sendEmail(emailObject: any) {
        return this.httpClient.post<{mailResponse: boolean}>(this.serverAddress + 'api/email/send', emailObject);
    }

}
