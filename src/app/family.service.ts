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
  private servicesList: any = [];
  private serverAddress = environment.backendURL;
  constructor(private httpClient: HttpClient, private router: Router, private http: Http) { }

  saveFamily(family: any) {
    return this.httpClient.post<{familyCreated: boolean}>(this.serverAddress + 'api/family/new', family);
  }
    listFamily():any{
      return this.httpClient.get<FamilyAPIResponse>(this.serverAddress + 'api/family/');
    }

    markFamilyActive(family: any) {
      return this.httpClient.post<{requestFulfilled: boolean}>(this.serverAddress + 'api/family/markActive', family);
    }
    markFamilyInactive(family: any) {
      return this.httpClient.post<{requestFulfilled: boolean}>(this.serverAddress + 'api/family/markInactive', family);
    }

    listActiveFamily(): any {
      return this.httpClient.get<FamilyAPIResponse>(this.serverAddress + 'api/family/active');
    }
    listInactiveFamily(): any {
      return this.httpClient.get<FamilyAPIResponse>(this.serverAddress + 'api/family/inactive');
    }

    familiesAddedThisMonth():any{
      return this.httpClient.get<FamilyAPIResponse>(this.serverAddress + 'api/family/month');
    }

    familiesToApprove():any{
      return this.httpClient.get<FamilyAPIResponse>(this.serverAddress + 'api/family/unapproved');
    }
    getFamilyByEmail(familyEmail: String) {
      return this.httpClient.get<FamilyAPIResponse>(this.serverAddress + 'api/family/email/' + familyEmail);
    }

    getFamilyById(familyId: Number) {
      return this.httpClient.get<FamilyAPIResponse>(this.serverAddress + 'api/family/id/' + familyId);
    }
    getFamilyById(familyId: Number) {
      return this.httpClient.get<FamilyAPIResponse>(this.serverAddress + 'api/family/id/' + familyId);
    }
    editFamily(family: any) {
      return this.httpClient.post<{familyUpdated: boolean}>(this.serverAddress + 'api/family/edit', family);
    }
  }
