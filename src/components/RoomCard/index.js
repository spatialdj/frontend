import React from 'react';
import { Flex, Text, Tag, HStack, Icon, Avatar } from '@chakra-ui/react';
import { BiBarChart } from 'react-icons/bi';

function RoomCard(props) {
  const { room } = props;

  return (
    <Flex
      cursor="pointer"
      flexDir="column"
      bgColor="gray.900"
      transition=".2s all"
      _hover={{
        opacity: 0.8,
      }}
      borderRadius="8px"
      padding="1rem 1.5rem 1.5rem 1.5rem"
      maxH="265px"
    >
      <Text
        fontSize="2xl"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {room.name}
      </Text>
      <HStack mt={1}>
        <Icon as={BiBarChart} />
        <Text
          color="gray.100"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {room.currentSong?.name ?? 'Unknown song'}
        </Text>
      </HStack>
      <Text
        color="#8193B2"
        fontWeight="light"
        maxH="4.5em"
        lineHeight="1.5em"
        wordBreak="break-word"
        textOverflow="ellipsis"
        overflow="hidden"
        my={2}
      >
        {room.description}
      </Text>
      <HStack style={{ 'margin-top': 'auto' }}>
        <Avatar size="xs" src={room.host.profilePicture} alt="pfp" />
        <Text color="white" mx="2" my="6">
          {room.host.username}
        </Text>
        {room.genres.map(genre => {
          return <Tag key={genre}>{genre}</Tag>;
        })}
      </HStack>
    </Flex>
  );
}

export default RoomCard;
