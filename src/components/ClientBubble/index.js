import React, { useContext, useEffect } from 'react';
import { SocketContext } from 'contexts/socket';
import { ClientPositionContext } from 'contexts/clientposition';
import { useDispatch } from 'react-redux';
import { joinRoom } from 'slices/currentRoomSlice';
import { populate } from 'slices/queueSlice';
import { Avatar, Tag, Flex } from '@chakra-ui/react';
import Draggable from 'react-draggable';

const ClientBubble = props => {
  const socket = useContext(SocketContext);
  const { clientPosition, setClientPosition } = useContext(
    ClientPositionContext
  );
  const dispatch = useDispatch();
  const { roomId, profilePicture, username, prefix } = props;

  useEffect(() => {
    socket.emit('join_room', roomId, response => {
      console.log('join_room', response);
      const { success, guest, room } = response;

      dispatch(joinRoom(response));

      if (success && room) {
        dispatch(
          populate({
            success,
            queue: room.queue,
            currentSong: room.currentSong,
            inQueue:
              room.queue.findIndex(user => user.username === username) !== -1,
          })
        );
      }

      if (success && guest === false) {
        if (room?.members?.[username]) {
          setClientPosition(room.members[username].position);
        }
      }
    });
  }, [socket, dispatch, setClientPosition, roomId, username]);

  useEffect(() => {
    socket.emit('pos_change', clientPosition);
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
        width="fit-content"
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
  );
};

export default ClientBubble;
