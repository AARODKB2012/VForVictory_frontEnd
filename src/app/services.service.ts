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

  saveRequest(request: any) {
    return this.httpClient.post<{requestCreated: boolean}>(this.serverAddress + 'api/service/new', request);
  }

  fulfillRequest(request: any) {
    return this.httpClient.post<{requestFulfilled: boolean}>(this.serverAddress + 'api/service/fulfill', request);
  }

  listActiveServices(): any {
    return this.httpClient.get<ServiceAPIResponse>(this.serverAddress + 'api/service/active');
  }

  listRenderedServices(): any {
    return this.httpClient.get<ServiceAPIResponse>(this.serverAddress + 'api/service/rendered');
  }
}
