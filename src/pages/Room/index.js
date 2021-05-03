import React from 'react';
import RoomBox from 'components/RoomBox';
import SongBar from 'components/SongBar';
import ChatBox from 'components/ChatBox';

function Room(props) {
  const roomId = props.match.params.id;
  return (
    <>
      <RoomBox roomId={roomId} />
      <ChatBox />
      <SongBar />
    </>
  );
}

export default Room;
