import {
  GET_SUBSCRIBER_SCHEDULE,
  ADD_SUBSCRIBER_OVERRIDESCHEDULE,
  GET_SUBSCRIBER_OVERRIDESCHEDULE,
  DELETE_SUBSCRIBER_OVERRIDESCHEDULE,
  API_USER_ERROR,
  CRM_OPERATIONS_UPDATE_SUBSCRIPTION_SCHEDULE
} from './actionType';
import { SubscriptionSchedule, OverrideSchedule } from '../type/Type';

const INITIAL_STATE: SubscriptionSchedule = {
  optedSchedule: {
    MONDAY: null,
    TUESDAY: null,
    WEDNESDAY: null,
    THURSDAY: null,
    FRIDAY: null,
    SATURDAY: null,
    SUNDAY: null
  },
  overrideSchedules: [],
  zone: '',
  user: null,
  personalization: null
};

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case GET_SUBSCRIBER_SCHEDULE:
      return { ...state, optedSchedule: action.payload };
    case GET_SUBSCRIBER_OVERRIDESCHEDULE:
      return { ...state, overrideSchedules: action.payload };
    case ADD_SUBSCRIBER_OVERRIDESCHEDULE:
      const overrideSchedules = state.overrideSchedules as Array<
        OverrideSchedule
      >;
      return {
        ...state,
        overrideSchedules: [...overrideSchedules, action.payload]
      };
    case DELETE_SUBSCRIBER_OVERRIDESCHEDULE:
      let delOverrideSchedules = state.overrideSchedules as Array<
        OverrideSchedule
      >;
      delOverrideSchedules = delOverrideSchedules.filter(
        (schedule: OverrideSchedule) =>
          schedule.overrideStartDate != action.payload.startDate
      );
      return { ...state, overrideSchedules: [...delOverrideSchedules] };

    case API_USER_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
