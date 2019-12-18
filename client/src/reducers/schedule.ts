import { GET_SCHEDULE_MONTHLY, ADD_SCHEDULE_REVIEW, GET_SCHEDULE_REVIEW_FOR_USER, GET_SCHEDULE_REVIEW_FOR_USER_FOR_DATERANGE,DELETE_SCHEDULE_REVIEW } from './actionType';
import { Schedule, Review } from '../type/Type';

const INITIAL_STATE: Schedule[] = [];

export const schedules = function(state: Schedule[] = INITIAL_STATE, action: any) {
  switch (action.type) {
    case GET_SCHEDULE_MONTHLY:
      return [...action.payload];
    case ADD_SCHEDULE_REVIEW:
    case GET_SCHEDULE_REVIEW_FOR_USER:
      return state.map((schedule) => {
        if(schedule.dailyDate===action.payload.scheduleDate) {
          return {
            ...schedule,  
            review : action.payload 
          }
        }
        return schedule
      });
    case GET_SCHEDULE_REVIEW_FOR_USER_FOR_DATERANGE:
        const reviews : Review [] =  [...action.payload]
        return state.map((schedule : Schedule) => {
          const review = reviews.find( review => review.scheduleDate === schedule.dailyDate  )
          if(review) {
            return {
              ...schedule,  
              review : action.payload 
            }
                      }
          return schedule
        });
    case DELETE_SCHEDULE_REVIEW:
        return state.map((schedule) => {
          if(schedule.dailyDate===action.payload.scheduleDate) {
            const { review,  ...rest } = schedule
            return rest

          }
          return schedule
        });   
    default:
      return state;
  }
};
