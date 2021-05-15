import React from 'react';
import { Avatar, Flex, Text } from '@chakra-ui/react';

export default function Message(props) {
  return (
    <Flex pb="1rem" w="100%">
      <Avatar size="xs" src={props.data.sender.profilePicture} alt="pfp" />
      <Text fontSize="sm" pl="0.5rem" w="100%" wordBreak="break-word">
        <b>{props.data.sender.username}: </b>
        {props.data.text}
      </Text>
    </Flex>
  );
}
