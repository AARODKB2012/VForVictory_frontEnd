import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import { map } from 'rxjs/operators';
import {environment} from '../environments/environment';
import { ServiceModel } from './service.model';
import { ServiceAPIResponse } from './response.model';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {
  private servicesList: any = [];
  private serverAddress = environment.backendURL;
  constructor(private httpClient: HttpClient, private router: Router, private http: Http) { }

  getAllServices(): any {
    return this.httpClient.get<ServiceAPIResponse>(this.serverAddress + 'api/service');
  }

  getAllCategories(): any {
    return this.httpClient.get<ServiceAPIResponse>(this.serverAddress + 'api/service/category');
  }

  getActiveServices(): any {
    return this.httpClient.get<ServiceAPIResponse>(this.serverAddress + 'api/service/list');
  }

  saveRequest(request: any) {
    return this.httpClient.post<{requestCreated: boolean}>(this.serverAddress + 'api/service/new', request);
  }

  fulfillRequest(request: any) {
    return this.httpClient.post<{requestFulfilled: boolean}>(this.serverAddress + 'api/service/fulfill', request);
  }

  markBusinessNotified(request: any) {
    return this.httpClient.post<{requestFulfilled: boolean}>(this.serverAddress + 'api/service/notifyBusiness', request);
  }

  markFamilyNotified(request: any) {
    return this.httpClient.post<{requestFulfilled: boolean}>(this.serverAddress + 'api/service/notifyFamily', request);
  }

  markBusinessFollowedUp(request: any) {
    return this.httpClient.post<{requestFulfilled: boolean}>(this.serverAddress + 'api/service/followupBusiness', request);
  }

  markFamilyFollowedUp(request: any) {
    return this.httpClient.post<{requestFulfilled: boolean}>(this.serverAddress + 'api/service/followupFamily', request);
  }

  markServiceActive(request: any) {
    return this.httpClient.post<{requestFulfilled: boolean}>(this.serverAddress + 'api/service/markActive', request);
  }

  markServiceInactive(request: any) {
    return this.httpClient.post<{requestFulfilled: boolean}>(this.serverAddress + 'api/service/markInactive', request);
  }

  listActiveRequests(): any {
    return this.httpClient.get<ServiceAPIResponse>(this.serverAddress + 'api/service/active');
  }

  listRenderedServices(): any {
    return this.httpClient.get<ServiceAPIResponse>(this.serverAddress + 'api/service/rendered');
  }
  getServiceById(serviceId: Number) {
    return this.httpClient.get<ServiceAPIResponse>(this.serverAddress + 'api/service/get/id/' + serviceId);
  }

  getRequestById(serviceId: Number) {
    return this.httpClient.get<ServiceAPIResponse>(this.serverAddress + 'api/service/id/' + serviceId);
  }

  deleteRequest(request: any) {
    return this.httpClient.post<{requestFulfilled: boolean}>(this.serverAddress + 'api/service/delete', request);
  }

  servicesRequestedThisMonth():any{
    return this.httpClient.get<any>(this.serverAddress + 'api/service/requested/month');
  }

  setValueCost(request: any) {
    return this.httpClient.post<{requestFulfilled: boolean}>(this.serverAddress + 'api/service/valuecost', request);
  }
}
