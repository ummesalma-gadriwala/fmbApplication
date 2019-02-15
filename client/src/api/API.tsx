export const TOKEN_API_ENPOINT =  `${process.env.REACT_APP_API_ENDPOINT}user/token`;
export const UPDATE_THALI_SCHEDULE_ENDPOINT = (subscriberId: string) => `${process.env.REACT_APP_API_ENDPOINT}subscriber/schedule/override/${subscriberId}`
export const GET_THALI_SCHEDULE_ENDPOINT = (subscriberId: string) => `${process.env.REACT_APP_API_ENDPOINT}subscriber/schedule/${subscriberId}`
export const DELETE_THALI_SCHEDULE_ENDPOINT = (subscriberId: string, startDate:string) => `${process.env.REACT_APP_API_ENDPOINT}subscriber/schedule/override/${subscriberId}/${startDate}`







//export default let logConfig = () =>  console.log ( `'TOKEN_API_ENPOINT': ${TOKEN_API_ENPOINT}`  );