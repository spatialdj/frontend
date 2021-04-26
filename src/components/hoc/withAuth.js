import React, { useEffect } from 'react';
import { authenticate } from 'slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { PUBLIC_PAGE, LOGGED_IN_ONLY, PUBLIC_ONLY } from './options';

export default function (Component, option) {
  function AuthenticationCheck(props) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      // To know my current status, send Auth request
      dispatch(authenticate());
    }, []);

    useEffect(() => {
      const { authenticated, status } = user;
      if (status !== 'idle' && status !== 'loading') {
        // Not logged in and tries to go to auth route
        if (!authenticated && option === LOGGED_IN_ONLY) {
          window.location.href = '/login';
          return null;
        } else if (authenticated && option === PUBLIC_ONLY) {
          // Logged in but tries to go to public only page like login page
          window.location.href = '/';
          return null;
        }
      }
    }, [user]);

    return <Component {...props} user={user} />;
  }
  return AuthenticationCheck;
}
