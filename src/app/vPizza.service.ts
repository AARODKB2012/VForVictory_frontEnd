import { VPizzaAPIResponse } from './vPizza_response.model';
import { VPizzaModel } from './vPizza.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Http} from '@angular/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VPizzaServices {
  private servicesList: any = [];
  private serverAddress = environment.backendURL;
  constructor(private httpClient: HttpClient, private router: Router, private http: Http) { }

  getAllVPizzaGC(): any {
    return this.httpClient.get<VPizzaAPIResponse>(this.serverAddress + 'api/VPizza');
  }

  getVPizzaByFamilyID(id: Number): any {
    return this.httpClient.get<VPizzaAPIResponse>(this.serverAddress + `api/VPizza/giftcard/id/${id}`);
  }

  getFullVPizza(id: Number, family_id: Number): any {
    return this.httpClient.get<VPizzaAPIResponse>(this.serverAddress + `api/Family/id/${id}/VPizza/family_id/${family_id}`);
  }

}
