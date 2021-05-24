export type User = {
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  email: string;
  registrationDate: string;
};

export type Roles = {
  name: string;
  description: string;
  value: string;
};

export type Login = {
  username: string;
  hashPassword: string;
};

export type ItemList = {
  id: Number;
  count: Number;
};
