import * as axios from 'axios';
import { Login } from './models';

const instance = () =>
  axios.default.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

export const getFoods = () => {
  return instance().get('/api/Food/getAll');
};

export const saveFood = (data: any) => {
  return instance().post('/api/Food', data);
};

export const getLoggerUser = () => {
  return instance().get('/api/User/GetLoggedUser');
};

export const pay = (data: any) => {
  return instance().post('/api/Orders', data);
};

export const getMyOrders = () => {
  return instance().get('/api/Orders/MyOrders');
};

export const login = (loginData: Login) => {
  return instance().post('/api/Login', loginData);
};
