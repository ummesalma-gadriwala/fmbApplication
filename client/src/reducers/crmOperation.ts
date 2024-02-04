import {
  CRM_OPERATIONS_CHANGE_MEAL_COUNT,
  CRM_OPERATIONS_GET_SUBSCRIBERS,
  CRM_OPERATIONS_UPDATE_SUBSCRIPTION_SCHEDULE,
  DELETE_SUBSCRIBER_OVERRIDESCHEDULE
} from './actionType';
import {
  CRMOperations,
  OverrideSchedule,
  SubscriptionSchedule
} from '../type/Type';
import SubscriptionInfo from '../components/User/SubscriptionInfo/SubscriptionInfo';

const INITIAL_STATE: any = {};

export default function(state: CRMOperations = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CRM_OPERATIONS_GET_SUBSCRIBERS:
      console.log('CRM_OPERATIONS_GET_SUBSCRIBERS', action);
      return { ...state, subscribers: action.payload };
    case DELETE_SUBSCRIBER_OVERRIDESCHEDULE:
      let updatedSubscribers =
        state.subscribers &&
        state.subscribers.map((subscriber: SubscriptionSchedule) => {
          if (subscriber.subscriberId === action.payload.subscriberId) {
            const delOverrideSchedules =
              subscriber && subscriber.overrideSchedules;
            subscriber.overrideSchedules =
              delOverrideSchedules &&
              delOverrideSchedules.filter(
                (schedule: OverrideSchedule) =>
                  schedule.overrideStartDate !== action.payload.startDate
              );
          }
          return subscriber;
        });

      return { ...state, subscribers: updatedSubscribers };
    case CRM_OPERATIONS_CHANGE_MEAL_COUNT:
      const updatedOverrideSchedule: OverrideSchedule =
        action.payload.overrideSchedule;
      updatedSubscribers =
        state.subscribers &&
        state.subscribers.map((subscriber: SubscriptionSchedule) => {
          if (subscriber.subscriberId === action.payload.subscriberId) {
            subscriber.overrideSchedules &&
              subscriber.overrideSchedules.push(updatedOverrideSchedule);
          }
          return subscriber;
        });
    case CRM_OPERATIONS_UPDATE_SUBSCRIPTION_SCHEDULE:
      const subscriptionSchedule = action.payload
        .subscriptionSchedule as SubscriptionSchedule;

      if (subscriptionSchedule && subscriptionSchedule.subscriberId) {
        const updatedSubscribers =
          state.subscribers &&
          state.subscribers.map((subscriber: SubscriptionSchedule) => {
            if (
              subscriber &&
              subscriber.subscriberId === subscriptionSchedule.subscriberId
            ) {
              return { ...subscriber, ...subscriptionSchedule };
            }
            return subscriber;
          });

        return { ...state, subscribers: updatedSubscribers };
      } else {
        console.error('Invalid subscriptionSchedule:', subscriptionSchedule);
        return state; // Return the current state in case of an error
      }

      return { ...state, subscribers: updatedSubscribers };
    default:
      return state;
  }
}
