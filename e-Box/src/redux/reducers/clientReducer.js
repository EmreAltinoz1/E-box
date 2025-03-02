// Action Types
export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const LOGOUT = 'LOGOUT';

const initialState = {
  user: null,
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'en'
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        addressList: [],
        creditCards: []
      };
    default:
      return state;
  }
} 