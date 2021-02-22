import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import { map } from 'rxjs/operators';
import {environment} from '../environments/environment';
import { UserModel } from './user.model';
import { UserAPIResponse } from './response.model';
import { BusinessAPIResponse } from './response.model';

@Injectable({
  providedIn: 'root'
})

export class BusinessService{

    private serverAddress = environment.backendURL;
    constructor(private httpClient: HttpClient,private route: Router, private http: Http){}

    listBusiness():any{
      return this.httpClient.get<BusinessAPIResponse>(this.serverAddress + 'api/business/');
    }

    getBusinessById(businessId: Number) {
      return this.httpClient.get<BusinessAPIResponse>(this.serverAddress + 'api/business/id/' + businessId);
    }

    getAllCategories(): any {
    return this.httpClient.get<BusinessAPIResponse>(this.serverAddress + 'api/business/category/');
    }

    getActiveBusinesses(): any {
      return this.httpClient.get<BusinessAPIResponse>(this.serverAddress + 'api/business/active/');
    }

    createBusiness(business: any) {
      return this.httpClient.post<{businessCreated: boolean}>(this.serverAddress + 'api/business/new', business);
    }

    editBusiness(business: any) {
      return this.httpClient.post<{businessUpdated: boolean}>(this.serverAddress + 'api/business/edit', business);
    }
  }
