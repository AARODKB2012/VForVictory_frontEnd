import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Http } from '@angular/http';
import {environment} from '../environments/environment';
import { BusinessAPIResponse } from './business_response.model';

@Injectable({
  providedIn: 'root'
})

export class BusinessService{
  
    private serverAddress = environment.backendURL;
    constructor(private httpClient: HttpClient,private route: Router, private http: Http){}

    businessAddedThisMonth():any{
      return this.httpClient.get<BusinessAPIResponse>(this.serverAddress + 'api/business/month');
    }

    businessToApprove():any{
      return this.httpClient.get<BusinessAPIResponse>(this.serverAddress + 'api/business/unapproved');
    }
  }
  