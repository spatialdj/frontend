import React, { useEffect, useContext, useState, useRef } from 'react';
import { SocketContext } from 'contexts/socket';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { leaveRoom, playSong as roomPlaySong } from 'slices/currentRoomSlice';
import { cycleSelectedPlaylist } from 'slices/playlistsSlice';
import { changeCurrentSong, reset as resetQueue } from 'slices/queueSlice';
import { reset as resetYoutube, playSong } from 'slices/youtubeSlice';
import { populate, reset as resetVote } from 'slices/voteSlice';
import { Box, useToast } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import produce from 'immer';
import Bubble from 'components/Bubble';
import ClientBubble from 'components/ClientBubble';
import LeaveRoomButton from 'components/LeaveRoomButton';
import YoutubePlayer from 'components/YoutubePlayer';
import ViewOnlyModal from 'components/ViewOnlyModal';

function RoomBox(props) {
  const socket = useContext(SocketContext);
  // Handles bubbles for all other members
  const [bubblesData, setBubblesData] = useState({});

  // TODO: instead of storing pos in bubblesData,
  // maybe have a separate state for positions?
  const [showViewOnly, setShowViewOnly] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);
  const {
    username: clientUsername,
    profilePicture,
    authenticated,
  } = currentUser;
  const currentRoom = useSelector(state => state.currentRoom);
  const { status, data } = currentRoom;
  const toast = useToast();
  const history = useHistory();
  const roomId = props.roomId;

  useEffect(() => {
    if (status === 'success' && data.members) {
      if (!authenticated) {
        setShowViewOnly(true);
      }
      // Populate bubbles data, but don't add client's bubble
      setBubblesData(produce(data.members, draft => {
        delete draft[clientUsername];
      }));
      // todo: set video position to current time - data.songStartTime
    } else if (status === 'failed') {
      toast({
        title: 'Error joining room',
        status: 'error',
        isClosable: true,
        duration: 9000,
      });
      history.push('/rooms');
    }
  }, [status, data.members, authenticated, clientUsername, history, toast]);

  useEffect(() => {
    const handlePosChange = (username, newPosition) => {
      if (clientUsername === username) return;

      // TODO: find a better way to update this
      setBubblesData(data => produce(data, draft => {
        if (draft?.[username]?.position) draft[username].position = newPosition;
      }));
    };

    const handleJoin = (user, position) => {
      const { username, profilePicture } = user;
      toast({
        title: `${username} joined`,
        status: 'info',
        variant: 'top-accent',
        position: 'top-right',
        isClosable: true,
        duration: 3000,
      });
      setBubblesData(data => produce(data, draft => {
        draft[username] = {
          profilePicture: profilePicture,
          prefix: '',
          username: username,
          type: 'other',
          position: position,
        };
      }));
    };

    const handleLeave = username => {
      toast({
        title: `${username} left`,
        status: 'error',
        variant: 'top-accent',
        position: 'top-right',
        isClosable: true,
        duration: 3000,
      });
      setBubblesData(data => produce(data, draft => {
        delete draft[username];
      }));
    };

    const handleTransferHost = username => {
      toast({
        title: `${username} is the host now!`,
        status: 'warning',
        variant: 'top-accent',
        position: 'top-right',
        isClosable: true,
        duration: 3000,
      });
      // TODO: change bubblesData to reflect host?
    };

    const handleRoomClosed = () => {
      toast({
        title: 'Room closed',
        description: 'The room you were in is now closed',
        status: 'error',
        isClosable: true,
        duration: 20000,
      });
      history.push('/rooms');
    };

    // Listen to user moving
    socket.on('pos_change', (username, position) => {
      handlePosChange(username, position);
      // console.log(`pos_change ${username}`, position);
    });

    // Listen to user joining room
    socket.on('user_join', response => {
      // console.log('user_join', response);
      const { user, position } = response;
      // Don't show own join toast to user
      if (user?.username !== clientUsername) {
        handleJoin(user, position);
      }
    });

    // Listen to user leaving room
    socket.on('user_leave', username => {
      // console.log('user_leave', username);
      handleLeave(username);
    });

    // Listen to user voting
    socket.on('user_vote', votes => {
      // console.log('user_vote', votes);
      dispatch(populate({ votes, clientUsername }));
    });

    // Listen to new host transfewr
    socket.on('new_host', response => {
      // console.log('new_host', response);
      const { username } = response;
      handleTransferHost(username);
    });

    // Listen to room closed
    socket.on('room_closed', () => {
      // console.log('room_closed');
      handleRoomClosed();
    });

    socket.on('play_song', song => {
      const { username: songPicker } = song;

      dispatch(roomPlaySong({ song }));
      dispatch(changeCurrentSong(song));

      if (songPicker === clientUsername) {
        // update redux cycle playlist
        dispatch(cycleSelectedPlaylist());
      }

      dispatch(playSong());
      dispatch(resetVote());
    });

    return () => {
      // console.log('room unmounted');
      socket.emit('leave_room', response => {
        // console.log('leave_room', response);
      });
      dispatch(leaveRoom());
      dispatch(resetVote());
      dispatch(resetYoutube());
      dispatch(resetQueue());
      socket.removeAllListeners('pos_change');
      socket.removeAllListeners('user_join');
      socket.removeAllListeners('user_leave');
      socket.removeAllListeners('new_host');
      socket.removeAllListeners('room_closed');
      socket.removeAllListeners('play_song');
    };
  }, [dispatch, socket, history, toast, roomId, clientUsername]);

  return (
    <Box id="canvas" overflow="hidden" h="calc(100vh - 80px)" w="100%">
      <Helmet>
        <title>{`${currentRoom?.data?.name} - Spatial.dj`}</title>
      </Helmet>
      <LeaveRoomButton />
      <YoutubePlayer isAuth={authenticated} height="390" width="640" />
      {Object.entries(bubblesData).map(([key, val]) => (
        <Bubble
          key={key}
          profilePicture={val.profilePicture}
          prefix={val.prefix}
          username={val.username}
          position={val.position}
          type={val.type}
        />
      ))}
      <ClientBubble
        roomId={roomId}
        profilePicture={profilePicture}
        prefix="👋"
        username={clientUsername}
      />
      <ViewOnlyModal
        isOpen={showViewOnly}
        onClose={() => setShowViewOnly(false)}
      />
    </Box>
  );
}

export default RoomBox;
