import React from 'react';
import RoomBox from 'components/RoomBox';
import SongBar from 'components/SongBar';
import { Global, css } from '@emotion/react';
import VoteBar from 'components/VoteBar';

function Room(props) {
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
      <VoteBar />
    </>
  );
}

export default Room;
