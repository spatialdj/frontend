import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flex,
  Text,
  Tag,
  TagLabel,
  TagRightIcon,
  HStack,
  Icon,
  Avatar,
} from '@chakra-ui/react';
import { BiBarChart } from 'react-icons/bi';
import { MdGroup } from 'react-icons/md';

function RoomCard(props) {
  const { room } = props;

  return (
    <Link to={`/room/${room.id}`}>
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
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            fontSize="2xl"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {room.name}
          </Text>
          <Tag colorScheme="blue" h={2}>
            <TagLabel>{room.numMembers}</TagLabel>
            <TagRightIcon as={MdGroup} />
          </Tag>
        </Flex>
        <HStack mt={1}>
          <Icon as={BiBarChart} />
          <Text
            color="gray.100"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {room.currentSong?.title ?? 'Unknown song'}
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
        <HStack style={{ marginTop: 'auto' }}>
          <Avatar size="xs" src={room.host.profilePicture} alt="pfp" />
          <Text color="white" mx="2" my="6">
            {room.host.username}
          </Text>
          {room.genres.map(genre => {
            return <Tag key={genre}>{genre}</Tag>;
          })}
        </HStack>
      </Flex>
    </Link>
  );
}

export default RoomCard;
