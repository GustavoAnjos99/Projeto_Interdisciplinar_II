import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../Auth/Context/auth';

const SecureRoute = ({allowedUserType, ...rest }) => {
    const { logado, userID } = useContext(AuthContext);
    const adminUserID = 'xlSBLZr64BODo1EkiD78aZQvQL72'; 
  if (logado) {
    if (userID === adminUserID && allowedUserType === 'admin') {
      return <Route {...rest} />;
    } else if (allowedUserType === 'cliente') {
      return <Route {...rest} />;
    }
  }
  return <Redirect to="/" />;
}

export { SecureRoute };
