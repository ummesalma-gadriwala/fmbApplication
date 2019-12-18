export const TOKEN_API_ENPOINT = `${process.env.REACT_APP_API_ENDPOINT}user/token`;
export const UPDATE_THALI_SCHEDULE_ENDPOINT = (subscriberId: string) =>
  `${process.env.REACT_APP_API_ENDPOINT}subscriber/schedule/override/${subscriberId}`;
export const GET_THALI_SCHEDULE_ENDPOINT = (subscriberId: string) =>
  `${process.env.REACT_APP_API_ENDPOINT}subscriber/schedule/${subscriberId}`;
export const DELETE_THALI_SCHEDULE_ENDPOINT = (
  subscriberId: string,
  startDate: string
) =>
  `${process.env.REACT_APP_API_ENDPOINT}subscriber/schedule/override/${subscriberId}/${startDate}`;
export const USER_PROFILE_ENDPOINT = (username: string | null) =>
  `${process.env.REACT_APP_API_ENDPOINT}subscriber/profile${
    username ? '/' + username : ''
  }`;
export const GET_SCHEDULLE_MONTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}schedule/month`;

export const GET_MEAL_COUNT_SECTORWISE_DAILY_ENDPOINT = (selectedDate:string ) => `${process.env.REACT_APP_API_ENDPOINT}admin/sector/meal/count/${selectedDate}`;

export const ADD_REVIEW =  `${process.env.REACT_APP_API_ENDPOINT}review`;

export const GET_REVIEW_BY_USERID_SCHEDULEDATE =  (username:string, selectedDate:string ) => `${process.env.REACT_APP_API_ENDPOINT}review/${username}/${selectedDate}`;

export const GET_REVIEWS_BY_SCHEDULEDATE =  ( selectedDate:string ) => `${process.env.REACT_APP_API_ENDPOINT}review/${selectedDate}`;

//export default let logConfig = () =>  console.log ( `'TOKEN_API_ENPOINT': ${TOKEN_API_ENPOINT}`  );

export const GET_REVIEW_BY_USERID_FOR_DATERANGE =  (username:string, fromDate:string, toDate:string ) => `${process.env.REACT_APP_API_ENDPOINT}review/${username}/${fromDate}/${toDate} `;
