import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Context } from '../defaults';

import jwt from 'jwt-decode';

const PrivateRoute = ({ component: Component, roles, ...rest }: any) => {
  const { token }: any = useContext(Context);
  const grantPermission = (props: any) => {
    if (token) {
      const persistedToken: any = jwt(token);
      if (Date.now() >= persistedToken.exp * 1000) {
        return (
          <Redirect
            to={{
              pathname: '/error/sessionexpired',
            }}
          />
        );
      } else {
        return <Component {...props} />;
      }
    } else {
      return (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      );
    }
  };

  return <Route {...rest} render={(props) => grantPermission(props)} />;
};
export default PrivateRoute;
