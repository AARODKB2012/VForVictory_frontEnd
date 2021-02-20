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

export class FamilyService{
  
    private serverAddress = environment.backendURL;
    constructor(private httpClient: HttpClient,private route: Router, private http: Http){}
  
    listFamily():any{
      return this.httpClient.get<FamilyAPIResponse>(this.serverAddress + 'api/family/');
    }

    familiesAddedThisMonth():any{
      return this.httpClient.get<FamilyAPIResponse>(this.serverAddress + 'api/family/month');
    }

    familiesToApprove():any{
      return this.httpClient.get<FamilyAPIResponse>(this.serverAddress + 'api/family/unapproved');
    }
  }
  