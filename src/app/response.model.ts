import { UserModel } from "./user.model";
import { ServiceModel } from "./service.model";
import { BusinessModel } from "./business.model";
import { FamilyModel } from "./family.model";
import { NoteModel } from "./note.model"

export interface FamilyAPIResponse {
  status: number;
  results: FamilyModel[];
  resultsLength: number;
}

export interface UserAPIResponse {
  status: number;
  results: UserModel[];
  resultsLength: number;
}

export interface ServiceAPIResponse {
  status: number;
  results: ServiceModel[];
  resultsLength: number;
}

export interface BusinessAPIResponse {
  status: number;
  results: BusinessModel[];
  resultsLength: number;
}

export interface NoteAPIResponse {
  status: number;
  results: NoteModel[];
  resultsLength: number;
}
