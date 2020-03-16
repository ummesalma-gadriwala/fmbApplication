import { GET_CONTENT_CONTACTINFO } from './actionType';
import { Content } from '../type/Type';

const INITIAL_STATE: any = {};

export default function(state: Content = INITIAL_STATE, action: any) {
  switch (action.type) {
    case GET_CONTENT_CONTACTINFO:
      return { ...state, "helpContacts" : action.payload };
    default:
      return state;
  }
}
