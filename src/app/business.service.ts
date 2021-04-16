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
    businessAddedThisMonth():any{
      return this.httpClient.get<BusinessAPIResponse>(this.serverAddress + 'api/business/month');
    }

    businessToApprove():any{
      return this.httpClient.get<BusinessAPIResponse>(this.serverAddress + 'api/business/unapproved');
    }

    createCategory(category: any) {
      return this.httpClient.post<{categoryCreated: boolean}>(this.serverAddress + 'api/business/category/new', category);
    }

    getCategoryById(categoryId: number): any {
      return this.httpClient.get<any>(this.serverAddress + 'api/business/category/' + categoryId);
    }

    updateCategory(category: any) {
      return this.httpClient.post<{categoryUpdated: boolean}>(this.serverAddress + 'api/business/category/update', category);
    }

    updateProfilePicture(profilePicture: File, businessName) {
      const formData: FormData = new FormData();
      formData.append('fileKey', profilePicture, profilePicture.name);
      return this.httpClient.post<{businessUpdated: boolean}>(this.serverAddress + 'api/business/picture/' + businessName, formData);
    }

    getServicesRendered(businessName): any {
      return this.httpClient.get<any>(this.serverAddress + 'api/business/services/rendered/' + businessName);
    }
    
    approveBusiness(businessId, approvedBy) {
      return this.httpClient.post<{businessApproved: boolean}>(this.serverAddress + `api/business/${businessId}/approve/${approvedBy}`, null);
    }
    disableBusiness(businessId, disabledBy) {
      return this.httpClient.post<{businessDisabled: boolean}>(this.serverAddress + `api/business/${businessId}/disable/${disabledBy}`, null);
    }
    
  }
