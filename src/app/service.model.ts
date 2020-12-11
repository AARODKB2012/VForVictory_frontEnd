export interface ServiceModel {
  id: number;
  familyName: string;
  businessName: string;
  businessCategory: string;
  dateRequested: string;
  dateFulfilled: string;
  notifiedBusiness: boolean;
  notifiedFamily: boolean;
  followedupBusiness: boolean;
  followedupFamily: boolean;
  active: boolean;
}
