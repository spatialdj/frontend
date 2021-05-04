import React from 'react';
import RoomBox from 'components/RoomBox';
import SongBar from 'components/SongBar';
import ChatBox from 'components/ChatBox';
import Vote from 'components/Vote';

function Room(props) {
  const roomId = props.match.params.id;
  return (
    <>
      <RoomBox roomId={roomId} />
      <ChatBox />
      <SongBar />
      <Vote />
    </>
  );
}

export default Room;
