import { CRM_OPERATIONS_CHANGE_MEAL_COUNT, CRM_OPERATIONS_GET_SUBSCRIBERS, DELETE_SUBSCRIBER_OVERRIDESCHEDULE } from './actionType';
import { CRMOperations, OverrideSchedule, SubscriptionSchedule } from '../type/Type';
import SubscriptionInfo from '../components/User/SubscriptionInfo/SubscriptionInfo';

const INITIAL_STATE: any = {};

export default function(state: CRMOperations = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CRM_OPERATIONS_GET_SUBSCRIBERS:
      console.log('CRM_OPERATIONS_GET_SUBSCRIBERS',action )
      return { ...state, "subscribers" : action.payload };
    case DELETE_SUBSCRIBER_OVERRIDESCHEDULE:
      let updatedSubscribers = state.subscribers.map( (subscriber:SubscriptionSchedule) => {
        if(subscriber.subscriberId === action.payload.subscriberId) {
          let delOverrideSchedules = subscriber &&  subscriber.overrideSchedules 
          subscriber.overrideSchedules = delOverrideSchedules && delOverrideSchedules.filter((schedule: OverrideSchedule) => schedule.overrideStartDate !== action.payload.startDate);
        }
        return subscriber;
      })
      
    return {...state, "subscribers":updatedSubscribers};
    case CRM_OPERATIONS_CHANGE_MEAL_COUNT:
      const updatedOverrideSchedule:OverrideSchedule = action.payload.overrideSchedule 
      updatedSubscribers = state.subscribers.map( (subscriber:SubscriptionSchedule) => {
        if(subscriber.subscriberId === action.payload.subscriberId) {
          subscriber.overrideSchedules && subscriber.overrideSchedules.push(updatedOverrideSchedule)
        }
        return subscriber;
      })
      
    return {...state, "subscribers":updatedSubscribers};
    default:
      return state;
  }
}
