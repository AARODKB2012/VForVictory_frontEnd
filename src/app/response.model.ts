import { UserModel } from "./user.model";
import { ServiceModel } from "./service.model";
import { BusinessModel } from "./business.model";

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
