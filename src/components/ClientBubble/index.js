import React, { useContext } from 'react';
import { ClientPositionContext } from 'contexts/clientposition';
import { Avatar, Tag, Flex } from '@chakra-ui/react';
import Draggable from 'react-draggable';

const ClientBubble = props => {
  const { clientPosition, setClientPosition } = useContext(
    ClientPositionContext
  );
  const { image, username, prefix } = props;

  // Prevents dragging text and images
  const preventDragHandler = e => {
    e.preventDefault();
  };

  const tagColor = 'green';

  const handleOnDrag = (e, data) => {
    const { x, y } = data;
    setClientPosition({ x, y });
  };

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
          src={image}
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
