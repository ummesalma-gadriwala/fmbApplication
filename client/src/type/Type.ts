import apiError from "../reducers/apiError";

export enum DayOfWeek {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}

export interface ISubscriptionSchedule {
  optedSchedule:{
    MONDAY:string | null;
    TUESDAY:string | null;
    WEDNESDAY:string | null;
    THURSDAY:string | null;
    FRIDAY:string | null;
    SATURDAY?: string | null;
    SUNDAY?: string | null;
  }
  overrideSchedules ?:  Array<IOverrideSchedule> | null;
  
}


export interface IOverrideSchedule {
  overrideStartDate: Date | string;
  overrideEndDate:Date | string;
  weeklyOverrideSchedule: {
    MONDAY:string | null;
    TUESDAY:string | null;
    WEDNESDAY:string | null;
    THURSDAY:string | null;
    FRIDAY:string | null;
    SATURDAY?: string | null;
    SUNDAY?: string | null;
  }
  
}

export interface IAuthentication {
  authenticated?: string | null;
  errorMessage?: string| null;
  decodedToken: IToken
}

export interface IToken {
  subscriberId: string|null;
  username:string|null;
  roles:string[],
  scopes:string[];
} 

export interface IAPIError {
  type:string  ,
  message: string | null
}


export interface IAppState {
  authentication:IAuthentication;
  mealSchedule: ISubscriptionSchedule;
  profile:IProfile;
  apiError: IAPIError;
}


export interface IProfile {
    username : string;
    mobileNumber : string;
    primaryAddress : {
        streetName : string;
        postalCode : string;
        city : string;
        province : string;
        country : string;
    },
    firstName : string;
    lastName : string;
    email : string;
}


