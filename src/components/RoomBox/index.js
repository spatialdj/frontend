import React, { useEffect, useContext, useState, useRef } from 'react';
import { SocketContext } from 'contexts/socket';
import { useSelector, useDispatch } from 'react-redux';
import { leaveRoom } from 'slices/currentRoomSlice';
import { Box, useToast } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import Bubble from 'components/Bubble';
import ClientBubble from 'components/ClientBubble';
import LeaveRoomButton from 'components/LeaveRoomButton';
import YoutubePlayer from 'components/YoutubePlayer';
import JoinFailedModal from 'components/JoinFailedModal';

function RoomBox(props) {
  const socket = useContext(SocketContext);

  const [song, setSong] = useState();
  const [bubblesData, setBubblesData] = useState([]);
  const [currentSongNumber, setCurrentSongNumber] = useState(0);

  // TODO: instead of storing pos in bubblesData,
  // maybe have a separate state for positions?
  const bubblesRef = useRef([]);
  bubblesRef.current = bubblesData;
  const [showJoinFailed, setShowJoinFailed] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);
  const currentRoom = useSelector(state => state.currentRoom);
  const toast = useToast();
  const roomId = props.roomId;

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

      setSong(data.currentSong);
      // todo: set video position to current time - data.songStartTime
    }
  }, [currentRoom, currentUser]);

  useEffect(() => {
    if (currentRoom == null) {
      return;
    }

    socket.emit('join_queue');
    // todo: remove socket from dependencies after implementing join queue button
  }, [currentRoom, socket]);

  useEffect(() => {
    // Listen to user moving
    socket.on('pos_change', (username, position) => {
      handlePosChange(username, position);
      // console.log(`pos_change ${username}`, position);
    });

    // Listen to user joining room
    socket.on('user_join', response => {
      console.log('user_join', response);
      const { user, position } = response;
      handleJoin(user, position);
    });

    // Listen to user leaving room
    socket.on('user_leave', username => {
      console.log('user_leave', username);
      handleLeave(username);
    });

    // Listen to new host transfewr
    socket.on('new_host', response => {
      console.log('new_host', response);
      const { username } = response;
      handleTransferHost(username);
    });

    // Listen to room closed
    socket.on('room_closed', () => {
      console.log('room_closed');
      handleRoomClosed();
    });

    socket.on('play_song', (username, videoId, startTime) => {
      console.log('play_song');
      setSong({
        username,
        id: videoId,
      });

      setCurrentSongNumber(currentSongNumber => currentSongNumber + 1);
      // todo: clamp and move video with startTime
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
        'play_song',
      ]);
    };
  }, [socket, roomId]);

  const handlePosChange = (username, position) => {
    if (currentUser?.username === username) return;

    const index = bubblesRef.current.findIndex(
      user => user.username === username
    );

    // TODO: find a better way to update this
    if (index !== -1) {
      setBubblesData([
        ...bubblesRef.current.slice(0, index),
        {
          image: bubblesRef.current[index].image,
          prefix: bubblesRef.current[index].prefix,
          username: bubblesRef.current[index].username,
          type: bubblesRef.current[index].type,
          position: position,
        },
        ...bubblesRef.current.slice(index + 1),
      ]);
    }
  };

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
    <Box id="canvas" overflow="hidden" h="calc(100vh - 80px)" w="100%">
      <Helmet>
        <title>{`${currentRoom?.data?.name} - Spatial.dj`}</title>
      </Helmet>
      <LeaveRoomButton />
      <YoutubePlayer
        isAuth={currentUser?.authenticated}
        id={song?.id}
        height="390"
        width="640"
        currentSongNumber={currentSongNumber}
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
      <JoinFailedModal
        isOpen={showJoinFailed}
        onClose={() => setShowJoinFailed(false)}
      />
    </Box>
  );
}

export default RoomBox;