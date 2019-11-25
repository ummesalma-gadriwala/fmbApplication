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

export interface SubscriptionSchedule {
  optedSchedule:{
    MONDAY:string | null;
    TUESDAY:string | null;
    WEDNESDAY:string | null;
    THURSDAY:string | null;
    FRIDAY:string | null;
    SATURDAY?: string | null;
    SUNDAY?: string | null;
  }
  overrideSchedules ?:  Array<OverrideSchedule> | null;
  
}


export interface OverrideSchedule {
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
  mealSchedule: SubscriptionSchedule;
  profile:IProfile;
  schedule: ISchedule[];
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

export interface IMenuItem {
   itemName: string;
   menuItemType: string;
}


export interface IMenu {
    items: IMenuItem[] | [];
}

export interface ISchedule {
  dailyDate: string;
  menu: IMenu | null;
  noMeal: boolean;
  noMealReason: string;
}


