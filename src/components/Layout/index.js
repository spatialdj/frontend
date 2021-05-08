import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Header from 'components/Header';
import GradientBackground from 'components/GradientBackground';

function Layout(props) {
  const inRoomPage = useRouteMatch('/room/:id');

  return (
    <GradientBackground>
      {inRoomPage?.isExact ? null : <Header />}
      {props.children}
    </GradientBackground>
  );
}

export default Layout;
