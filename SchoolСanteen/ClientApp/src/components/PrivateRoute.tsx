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
              state: { from: props.location },
            }}
          />
        );
      } else {
        const role = persistedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        if (role && roles.indexOf(role) === -1) {
          return (
            <Redirect
              to={{
                pathname: '/error/noaccess',
                state: { from: props.location },
              }}
            />
          );
        }
        return <Component {...props} />;
      }
    } else {
      return (
        <Redirect
          to={{
            pathname: '/error/unauthorized',
            state: { from: props.location },
          }}
        />
      );
    }
  };

  return (
    <>
      <Route {...rest} render={(props) => grantPermission(props)} />
    </>
  );
};
export default PrivateRoute;
