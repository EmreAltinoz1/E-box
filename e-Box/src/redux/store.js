import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';
import userReducer from '../store/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    client: clientReducer,
    product: productReducer,
    shoppingCart: shoppingCartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger)
});

export default store; 