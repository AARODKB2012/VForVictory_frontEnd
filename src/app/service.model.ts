export interface ServiceModel {
  id: number;
  familyId: number;
  businessId: number;
  name: string;
  email: string;
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
