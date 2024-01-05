export enum DayOfWeek {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}

export enum PackageColorType {
  Transparent = 'Single',
  White = 'Medium',
  Grey = 'Regular'
}

export enum PackageTypeColor {
  Regular = 'Grey',
  Medium = 'White',
  Single = 'Transparent'
}

export enum PackageColor {
  Transparent = 'Transparent',
  White = 'White',
  Grey = 'Grey'
}

export enum PackageType {
  Regular = 'Regular',
  Medium = 'Medium',
  Single = 'Single'
}

export const ContributionType_TIFFIN = 'tiffin';
export const ContributionType_FATEHA = 'fateha';
export const ContributionType_ZABIHAT = 'zabihat';

export interface SubscriptionSchedule {
  optedSchedule: {
    MONDAY: string | null;
    TUESDAY: string | null;
    WEDNESDAY: string | null;
    THURSDAY: string | null;
    FRIDAY: string | null;
    SATURDAY?: string | null;
    SUNDAY?: string | null;
  };
  overrideSchedules?: Array<OverrideSchedule> | null;
  zone: string;
  user?: Profile | null;
  subscriberId?: string | null;
  status?: string | null;
  personalization:TiffinPersonalization | null;
}

export interface TiffinPersonalization {
  subscriberId: string;
  noRice: {
    activate: boolean;
    tiffinCount: number;
  };
  packageType: PackageType;
}

export interface OverrideSchedule {
  overrideStartDate: Date | string;
  overrideEndDate: Date | string;
  weeklyOverrideSchedule: {
    MONDAY: string | null;
    TUESDAY: string | null;
    WEDNESDAY: string | null;
    THURSDAY: string | null;
    FRIDAY: string | null;
    SATURDAY?: string | null;
    SUNDAY?: string | null;
  };
}

export interface Authentication {
  authenticated?: string | null;
  errorMessage?: string | null;
  decodedToken: Token;
}

export interface Token {
  subscriberId: string | null;
  username: string | null;
  roles: string[];
  scopes: string[];
}

export interface APIError {
  type: string;
  message: string | null;
}

export interface AppState {
  authentication: Authentication;
  mealSchedule: SubscriptionSchedule;
  profile: Profile;
  schedules: Schedule[];
  apiError: APIError;
  isBusyCommunicating: boolean;
  serviceWorkerUpdated: boolean;
  operations:Operations | null;
  crmOperation:CRMOperations | null;
  content: Content | null;
}

export interface Profile {
  username: string;
  mobileNumber: string;
  primaryAddress: {
    streetName: string;
    postalCode: string;
    city: string;
    province: string;
    country: string;
  };
  firstName: string;
  lastName: string;
  email: string;
}

export interface MenuItem {
  itemName: string;
  menuItemType: string;
}

export interface Menu {
  items: MenuItem[] | [];
}

export interface Schedule {
  dailyDate: string;
  menu: Menu | null;
  noMeal: boolean;
  noMealReason: string;
  contributors: Contributor[] | [];
  instructionsForSubscriber?: LabelValue[] | [];
  review: Review | null;
}

export interface Contributor {
  contributionDate: string;
  contributionType: string;
  contributorAllowedToChooseMenu: boolean;
  messageFromContributor: LabelValue[] | [];
  user?: Profile;
}

export interface LabelValue {
  messageLabel: string;
  messageValue: string;
}

export interface Operations {
  reportDailyThaliCount: SectorCountSelectedDate;
}

export interface CRMOperations {
  subscribers: SubscriptionSchedule[];
  selectedSubscriber: SubscriptionSchedule;
}

export interface SectorCountSelectedDate {
  selectedDate: string | null;
  sectorCounts: SectorCount[];
}

export interface PackageTiffinCount {
  actualCount: number;
  cancellationCount: number;
  additionCount: number;
}

export type SectorWiseCount = {
  [sectorName: string]: SectorCount;
};

export type PackageTypeTiffinCount = {
  [packageType in PackageType]: PackageTiffinCount;
};
export interface SectorCount {
  sectorName: string;
  tiffinCount: number;
  cancellationScheduleCount: number;
  additionScheduleCount: number;
  noRiceTiffinCount: number;
  packageTypeTiffinCount: PackageTypeTiffinCount;
}

export interface Review {
  // eslint-disable-next-line @typescript-eslint/ban-types
  id: Object | null;
  scheduleDate: string;
  username: string;
  subscriberId: string;
  questionAnswer: LabelValue[];
}

export interface Content {
  helpContacts: LabelValue[];
  sectors: LabelValue[];
}
