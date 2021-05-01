import React from 'react';
import { Avatar, Flex, VStack, Text } from '@chakra-ui/react';

export default function Message(props) {
  return (
    <Flex pb="1rem">
      <Avatar size="xs" src={props.data.profilePicture} alt="pfp" />
      <Text fontSize="sm" pl="0.5rem">
        <b>{props.data.username}: </b>
        {props.data.message}
      </Text>
    </Flex>
  );
}
