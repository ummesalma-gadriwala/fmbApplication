import axios from 'axios';
import { GET_CONTACTINFO_CONTENT } from '../api/API';
import { API_SERVER_ERROR, GET_CONTENT_CONTACTINFO } from './actionType';

export const getContactInfo = (  
  onErrorCallback: Function
) => async (dispatch: Function) => {
  try {
    const contactInfo = await axios.get(GET_CONTACTINFO_CONTENT());
    dispatch({ type: GET_CONTENT_CONTACTINFO, payload: contactInfo.data });
  } catch (e) {
    console.log(e);
    onErrorCallback();
    dispatch({ type: API_SERVER_ERROR, payload: 'getContactInfo' });
  }
};
