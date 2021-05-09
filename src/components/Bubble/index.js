import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from 'contexts/socket';
import {
  Avatar,
  Tag,
  ScaleFade,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
} from '@chakra-ui/react';
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';

function Bubble(props) {
  const socket = useContext(SocketContext);
  const { profilePicture, username, prefix, type, position } = props;
  const [isHover, setIsHover] = useState(false);
  const showTag = isHover || type === 'songPicker';

  const [openPopover, setOpenPopover] = useState(false);
  const [reaction, setReaction] = useState('');
  const showReaction = () => {
    // Open reaction popover for 10 seconds
    setOpenPopover(true);
    setTimeout(() => setOpenPopover(false), 5000);
  };

  useEffect(() => {
    socket.on('reaction', response => {
      // Only show popover if sender is current user
      if (response?.sender?.username === username) {
        setReaction(response?.message);
        showReaction();
      }
    });
    return () => {
      socket.removeAllListeners('reaction');
    };
  }, [socket, username]);

  // Prevents dragging text and images
  const preventDragHandler = e => {
    e.preventDefault();
  };

  let tagColor = 'blue';

  switch (type) {
    case 'songPicker':
      tagColor = 'red';
      break;
    default:
      break;
  }

  const handleHover = e => {
    setIsHover(true);
  };

  const handleUnHover = e => {
    setIsHover(false);
  };

  return (
    <Draggable
      disabled={true}
      position={position}
      defaultClassName="_draggable"
      defaultClassNameDragging="__dragging"
      defaultClassNameDragged="__dragged"
      bounds="#canvas"
    >
      <motion.div
        style={{
          position: 'absolute',
          display: 'flex',
          transition: 'transform .1s linear',
          width: '128px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleUnHover}
        key="test"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Popover
          autoFocus={false}
          isOpen={openPopover}
          placement="top"
          arrowSize={10}
        >
          <PopoverTrigger>
            <Avatar
              cursor={type !== 'you' ? 'pointer' : 'move'}
              size="lg"
              src={profilePicture}
              name={username}
              onDragStart={preventDragHandler}
            />
          </PopoverTrigger>
          <PopoverContent maxW="43px" bg="rgba(12, 22, 45)">
            <PopoverArrow bg="#0c162d" />
            <PopoverBody px="10px">{reaction}</PopoverBody>
          </PopoverContent>
        </Popover>

        <ScaleFade in={showTag} initialScale={0.8}>
          <Tag
            mt={4}
            variant="solid"
            colorScheme={tagColor}
            maxW="128px"
            textAlign="center"
          >
            {`${prefix} ${username.substr(0, 20)}`}
          </Tag>
        </ScaleFade>
      </motion.div>
    </Draggable>
  );
}

export default Bubble;
