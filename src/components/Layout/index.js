import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Header from 'components/Header';
import GradientBackground from 'components/GradientBackground';

function Layout(props) {
  const inRoomPage = useRouteMatch('/room/:id');

  if (inRoomPage?.isExact) {
    return (
      <GradientBackground src="/DarkGradient14.jpg">
        {props.children}
      </GradientBackground>
    );
  } else {
    return (
      <GradientBackground src="/DarkGradient14.jpg">
        <Header />
        {props.children}
      </GradientBackground>
    );
  }
}

export default Layout;
