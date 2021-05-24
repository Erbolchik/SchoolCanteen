import * as axios from 'axios';
import { Login } from './models';

const instance = () =>
  axios.default.create({
    headers: {
      'Content-Type': 'application/json',
    },
  });

//#region Service spending
export const getLoggerUser = () => {
  return instance().get('http://localhost:52425/api/User/GetLoggedUser');
};

export const pay = (data: any) => {
  console.log(data);
  return instance().post('http://localhost:52425/api/User/GetLoggedUser');
  // ербо добей апишку плз
};

// export const saveServiceSpending = (data: any) => {
//   return instance().post('/api/ServiceSpending', data);
// };

// export const updateServiceSpending = (data: any) => {
//   return instance().put('/api/ServiceSpending', data);
// };

// export const deleteServiceSpending = (id: number) => {
//   return instance().delete(`/api/ServiceSpending/${id}`);
// };
//#endregion

export const login = (loginData: Login) => {
  debugger;
  return instance().post('http://localhost:52425/api/Login', loginData);
};
