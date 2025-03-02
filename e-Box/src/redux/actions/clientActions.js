import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE } from '../reducers/clientReducer';
import { axiosInstance } from '../../components/Axios';

// Action Types
export const LOGOUT = 'LOGOUT';

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language
});

export const logout = () => ({
  type: LOGOUT
});

// Thunk Action Creator for Roles
export const fetchRoles = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/roles');
    dispatch(setRoles(response.data));
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
}; 