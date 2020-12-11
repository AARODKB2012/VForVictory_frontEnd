import { UserModel } from "./user.model";
import { ServiceModel } from "./service.model";

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
