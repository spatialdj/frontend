import React, { useEffect } from 'react';
import { authenticate } from 'slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { PUBLIC_PAGE, LOGGED_IN_ONLY, PUBLIC_ONLY } from './options';
import { Fade } from '@chakra-ui/react';
import LoadingView from 'components/LoadingView';

export default function (Component, option) {
  function AuthenticationCheck(props) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { authenticated, status } = user;
    const loadFinished = status !== 'idle' && status !== 'loading';

    useEffect(() => {
      // To know my current status, send Auth request
      if (status === 'idle') {
        dispatch(authenticate());
      }
    }, []);

    // console.log('authenticated', authenticated);

    if (loadFinished) {
      // Not logged in and tries to go to auth route
      if (!authenticated && option === LOGGED_IN_ONLY) {
        props.history.push('/login');
        return null;
      } else if (authenticated && option === PUBLIC_ONLY) {
        // Logged in but tries to go to public only page like login page
        props.history.push('/');
        return null;
      }
    } else if (!loadFinished) {
      return <LoadingView />;
    }

    // Maybe fading in the entire App is a bad idea LOL...
    return (
      <Fade in={loadFinished}>
        <Component {...props} user={user} />
      </Fade>
    );
  }
  return AuthenticationCheck;
}
