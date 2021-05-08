import React from 'react';
import { Global, css } from '@emotion/react';

function GradientBackground(props) {
  const { src } = props;
  return (
    <>
      <Global
        styles={css`
          body {
            height: 100%;
            background: url('${src ?? '/DarkGradient14.jpg'}') no-repeat center
              center fixed !important;
            background-color: #040d21 !important;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover !important;
          }
        `}
      />
      {props.children}
    </>
  );
}

export default GradientBackground;
