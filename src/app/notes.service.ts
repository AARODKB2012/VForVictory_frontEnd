import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import {environment} from '../environments/environment';
import { NoteAPIResponse } from './response.model';

@Injectable({
  providedIn: 'root'
})

export class NotesService{
  private servicesList: any = [];
  private serverAddress = environment.backendURL;
  constructor(private httpClient: HttpClient, private router: Router, private http: Http) { }

    getFamilyNotes(familyId: Number) {
      return this.httpClient.get<NoteAPIResponse>(this.serverAddress + 'api/family/notes/id/' + familyId);
    }

    addNote(note: any) {
      return this.httpClient.post<{noteAdded: boolean}>(this.serverAddress + 'api/family/notes/new', note);
    }

    editNote(note: any) {
      return this.httpClient.post<{noteUpdated: boolean}>(this.serverAddress + 'api/family/notes/edit', note);
    }

    deleteNote(note: any) {
      return this.httpClient.post<{noteDeleted: boolean}>(this.serverAddress + 'api/family/notes/delete', note);
    }
  }
