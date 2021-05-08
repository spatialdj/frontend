import React, { useContext, useEffect, useRef } from 'react';
import { SocketContext } from 'contexts/socket';
import { ClientPositionContext } from 'contexts/clientposition';
import { useDispatch } from 'react-redux';
import { joinRoom } from 'slices/currentRoomSlice';
import { populate as populateQueue } from 'slices/queueSlice';
import { populate as populateVote } from 'slices/voteSlice';
import { Avatar, Tag, Flex, Fade } from '@chakra-ui/react';
import Draggable from 'react-draggable';
import throttle from 'utils/throttle';

const ClientBubble = props => {
  const socket = useContext(SocketContext);
  const { clientPosition, setClientPosition } = useContext(
    ClientPositionContext
  );
  const dispatch = useDispatch();
  const throttledPosChange = useRef(
    throttle(pos => socket.emit('pos_change', pos), 50)
  );
  const { roomId, profilePicture, username, prefix } = props;

  useEffect(() => {
    socket.emit('join_room', roomId, response => {
      // console.log('join_room', response);
      const { success, guest, room } = response;

      dispatch(joinRoom(response));

      if (success && room) {
        dispatch(
          populateQueue({
            success,
            queue: room.queue,
            currentSong: room.currentSong,
            inQueue:
              room.queue.findIndex(user => user.username === username) !== -1,
          })
        );
        dispatch(populateVote({ votes: room.votes, clientUsername: username }));
      }

      if (success && guest === false) {
        if (room?.members?.[username]) {
          setClientPosition(room.members[username].position);
        }
      }
    });
    return () => {
      // console.log('clientbubble umounted');
      setClientPosition({ x: -1, y: -1 });
    };
  }, [socket, dispatch, setClientPosition, roomId, username]);

  useEffect(() => {
    throttledPosChange.current(clientPosition);
    // socket.emit('pos_change', pos)
  }, [socket, clientPosition]);

  // Prevents dragging text and images
  const preventDragHandler = e => {
    e.preventDefault();
  };

  const tagColor = 'green';

  const handleOnDrag = (e, data) => {
    const { x, y } = data;
    setClientPosition({ x, y });
  };

  // Don't show client bubble if position is not loaded
  if (clientPosition.x === -1 && clientPosition.y === -1) {
    return null;
  }

  return (
    <Fade in={true}>
      <Draggable
        onDrag={handleOnDrag}
        position={clientPosition}
        defaultClassName="_draggable"
        defaultClassNameDragging="__dragging"
        defaultClassNameDragged="__dragged"
        bounds="#canvas"
      >
        <Flex
          position="absolute"
          width="128px"
          flexDir="column"
          alignItems="center"
        >
          <Avatar
            boxShadow={`0 0 4px 4px ${tagColor}`}
            bgColor={`${tagColor}.500`}
            cursor="move"
            size="lg"
            src={profilePicture}
            name={username}
            onDragStart={preventDragHandler}
          />

          <Tag
            mt={4}
            variant="solid"
            colorScheme={tagColor}
            maxW="128px"
            textAlign="center"
          >
            {`${prefix} ${username.substr(0, 20)} (you)`}
          </Tag>
        </Flex>
      </Draggable>
    </Fade>
  );
};

export default ClientBubble;
