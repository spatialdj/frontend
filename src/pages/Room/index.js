import React from 'react';
import { useSelector } from 'react-redux';
import RoomBox from 'components/RoomBox';
import SongBar from 'components/SongBar';
import { Global, css } from '@emotion/react'
import Vote from 'components/Vote';
import VoteBar from 'components/VoteBar';

function Room(props) {
  const authenticated = useSelector(state => state.user.authenticated);
  const roomId = props.match.params.id;

  return (
    <>
      <Global
        styles={css`
          html {
            height: 100%;
          }
        `}
      />
      <RoomBox roomId={roomId} />
      <SongBar />
      {authenticated ? <Vote /> : null}
      <VoteBar />
    </>
  );
}

export default Room;
