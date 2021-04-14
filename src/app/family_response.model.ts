import { FamilyModel } from './family.model';

export interface FamilyAPIResponse {
  status: number;
  results: FamilyModel[];
  resultsLength: number;
}
