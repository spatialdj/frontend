import React, { useState, useRef } from 'react';
import { Avatar, Tag, Flex, ScaleFade } from '@chakra-ui/react';
import Draggable from 'react-draggable';

const colors = ['orange', 'yellow', 'teal', 'blue', 'cyan', 'purple', 'pink'];
const weights = ['50', '100', '300', '400', '500', '600', '700', '800', '900'];

/**
 * Generates random Chakra-UI colors
 * @param {string[]} colors array of color strings
 * @param {string[]} weights array of color weights
 * @returns {string} a color in `color`.`weight` form
 */
const generateRandomColor = (colors, weights) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomWeight = weights[Math.floor(Math.random() * weights.length)];
  return `${randomColor}.${randomWeight}`;
};

function Bubble(props) {
  const { image, username, prefix, type, position } = props;
  const [isHover, setIsHover] = useState(false);
  const avatarColor = useRef(generateRandomColor(colors, weights));
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
        position="absolute"
        onMouseEnter={handleHover}
        onMouseLeave={handleUnHover}
        width="fit-content"
        flexDir="column"
        alignItems="center"
      >
        <Avatar
          boxShadow={`0 0 0 4px ${avatarColor.current}`}
          bgColor={avatarColor.current}
          cursor={type !== 'you' ? 'pointer' : 'move'}
          size="lg"
          src={image}
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
