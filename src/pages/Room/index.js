import React from 'react';
import { useSelector } from 'react-redux';
import RoomBox from 'components/RoomBox';
import SongBar from 'components/SongBar';
import ChatBox from 'components/ChatBox';
import Vote from 'components/Vote';
import JoinQueueButton from 'components/JoinQueueButton';

function Room(props) {
  const authenticated = useSelector(state => state.user.authenticated);
  const roomId = props.match.params.id;

  return (
    <>
      <RoomBox roomId={roomId} />
      <ChatBox />
      <SongBar />
      {authenticated ? <Vote /> : null}
      {authenticated ? <JoinQueueButton /> : null}
    </>
  );
}

export default Room;
