import React from 'react';
import { useRouteMatch } from "react-router-dom";
import Header from 'components/Header';

function Layout(props) {
  const inRoomPage = useRouteMatch("/room/:id");
  
  return (
    <>
      {inRoomPage?.isExact ? null : <Header />}
      {props.children}
    </>
  );
}

export default Layout;
