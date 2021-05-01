import React, { useEffect, useContext, useState } from 'react';
import { SocketContext } from 'contexts/socket';
import { useSelector, useDispatch } from 'react-redux';
import { leaveRoom } from 'slices/currentRoomSlice';
import { Box, useToast } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import Bubble from 'components/Bubble';
import ClientBubble from 'components/ClientBubble';
import LeaveRoomButton from 'components/LeaveRoomButton';
import YoutubePlayer from 'components/YoutubePlayer';
import SongBar from 'components/SongBar';
import JoinFailedModal from 'components/JoinFailedModal';
import { auth } from 'services/user';

function Room(props) {
  const socket = useContext(SocketContext);
  const [bubblesData, setBubblesData] = useState([]);
  const [showJoinFailed, setShowJoinFailed] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);
  const currentRoom = useSelector(state => state.currentRoom);
  const toast = useToast();
  const roomId = props.match.params.id;

  useEffect(() => {
    const { username, authenticated } = currentUser;
    const { status, data } = currentRoom;
    console.log('[currentRoom.data, currentUser]');
    if (status === 'failed') {
      toast({
        title: 'Error joining room',
        status: 'error',
        isClosable: true,
        duration: 9000,
      });
      props.history.push('/rooms');
    } else if (status === 'success' && !authenticated) {
      setShowJoinFailed(true);
    } else if (status === 'success' && data && username) {
      // Populate bubbles data, but ignore if member.username is
      // same as client's username
      setBubblesData(
        data.members.filter(member => member.username !== username)
      );
    }
  }, [currentRoom, currentUser]);

  useEffect(() => {
    // Listen to user joining room
    socket.on('user_join', response => {
      const { user, position } = response;
      handleJoin(user, position);
      console.log('user_join', response);
    });

    // Listen to user leaving room
    socket.on('user_leave', username => {
      handleLeave(username);
      console.log('user_leave', username);
    });

    // Listen to new host transfewr
    socket.on('new_host', response => {
      const { username } = response;
      handleTransferHost(username);
      console.log('new_host', response);
    });

    // Listen to room closed
    socket.on('room_closed', () => {
      handleRoomClosed();
      console.log('room_closed');
    });

    return () => {
      console.log('room unmounted');
      socket.emit('leave_room', response => {
        console.log('leave_room', response);
      });
      dispatch(leaveRoom());
      socket.removeAllListeners([
        'user_join',
        'user_leave',
        'new_host',
        'room_closed',
      ]);
    };
  }, [socket, roomId]);

  const handleJoin = (user, position) => {
    const { username, profilePicture } = user;
    toast({
      title: `${username} joined`,
      status: 'info',
      variant: 'top-accent',
      isClosable: true,
      duration: 5000,
    });
    setBubblesData(data => [
      ...data,
      {
        image: profilePicture,
        prefix: '',
        username: username,
        type: 'other',
        position: position,
      },
    ]);
  };

  const handleLeave = username => {
    toast({
      title: `${username} left`,
      status: 'error',
      variant: 'top-accent',
      isClosable: true,
      duration: 5000,
    });
    setBubblesData(data => data.filter(user => user.username !== username));
  };

  const handleTransferHost = username => {
    toast({
      title: `${username} is the host now!`,
      status: 'warning',
      variant: 'top-accent',
      isClosable: true,
      duration: 5000,
    });
    // TODO: change bubblesData to reflect host?
  };

  const handleRoomClosed = () => {
    // TODO: implement room closed
  };

  return (
    <Box id="canvas" overflow="hidden" h="100vh" w="100%">
      <Helmet>
        <title>{`${currentRoom?.data?.name} - Spatial.dj`}</title>
      </Helmet>
      <LeaveRoomButton />
      <YoutubePlayer
        isAuth={currentUser?.authenticated}
        id="LITzD9YjuS8"
        height="390"
        width="640"
      />
      {bubblesData.map(item => (
        <Bubble
          key={item.username}
          image={item.image}
          prefix={item.prefix}
          username={item.username}
          position={item.position}
          type={item.type}
        />
      ))}
      <ClientBubble
        roomId={roomId}
        image={currentUser?.profilePicture}
        prefix="👋"
        username={currentUser?.username}
      />
      <SongBar />
      <JoinFailedModal
        isOpen={showJoinFailed}
        onClose={() => setShowJoinFailed(false)}
      />
    </Box>
  );
}

export default Room;
