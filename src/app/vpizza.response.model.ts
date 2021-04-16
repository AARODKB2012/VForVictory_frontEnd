import {VPizzaModel} from './vPizza.model'

export interface VPizzaAPIResponse {
  status: number;
  results: VPizzaModel[];
  resultsLength: number;
}