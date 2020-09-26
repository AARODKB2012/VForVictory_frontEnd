import { UserModel } from "./user.model";

export interface UserAPIResponse {
  status: number;
  results: UserModel[];
  resultsLength: number;
}
