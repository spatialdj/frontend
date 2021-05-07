import React, { useState } from 'react';
import { Avatar, Tag, Flex, ScaleFade } from '@chakra-ui/react';
import Draggable from 'react-draggable';

function Bubble(props) {
  const { profilePicture, username, prefix, type, position } = props;
  const [isHover, setIsHover] = useState(false);
  const showTag = isHover;

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
      <Flex
        transition="transform .1s linear"
        position="absolute"
        onMouseEnter={handleHover}
        onMouseLeave={handleUnHover}
        width="128px"
        flexDir="column"
        alignItems="center"
      >
        <Avatar
          cursor={type !== 'you' ? 'pointer' : 'move'}
          size="lg"
          src={profilePicture}
          name={username}
          onDragStart={preventDragHandler}
        />

        <ScaleFade in={showTag} initialScale={0.8}>
          <Tag
            mt={4}
            variant="solid"
            colorScheme={tagColor}
            maxW="128px"
            textAlign="center"
          >
            {prefix}&nbsp;{username.substr(0, 20)}
          </Tag>
        </ScaleFade>
      </Flex>
    </Draggable>
  );
}

export default Bubble;
