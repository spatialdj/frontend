import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
} from '@chakra-ui/react';
import { IoMdSend } from 'react-icons/io';
import { VscChromeMinimize } from 'react-icons/vsc';
import { FiMaximize2 } from 'react-icons/fi';
import styled from '@emotion/styled';
import MessagesList from './components/MessagesList';

const ChatContainer = styled(SimpleGrid)`
  bottom: 80px;
  right: 0;
  background-color: rgba(12, 22, 45, 0.5);
`;

function ChatBox() {
  const currentUser = useSelector(state => state.user);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  // TEST MESSAGES
  const messages = [
    {
      id: 1,
      username: 'WitherNinja',
      profilePicture:
        'https://avatars.githubusercontent.com/u/43327291?s=400&u=811aa89b0dc13d8557ac8ed0254574426513d3b9&v=4',
      message: 'poggers',
    },
    {
      id: 2,
      username: 'WitherNinja',
      message: 'poggers',
    },
    {
      id: 3,
      username: 'WitherNinja',
      message: 'poggers',
    },
    {
      id: 4,
      username: 'WitherNinja',
      message: 'poggers',
    },
    {
      id: 5,
      username: 'WitherNinja',
      message: 'poggers',
    },
    {
      id: 6,
      username: 'WitherNinja',
      message:
        'this is a really long message to test what would happen to chat box',
    },
    {
      id: 7,
      username: 'WitherNinja',
      message: 'poggers',
    },
    {
      id: 8,
      username: 'WitherNinja',
      message: 'poggers',
    },
    {
      id: 9,
      username: 'WitherNinja',
      message:
        'this is a really long message to test what would happen to chat box',
    },
    {
      id: 10,
      username: 'kWh',
      message: 'frick this song',
    },
    {
      id: 11,
      username: 'WitherNinja',
      message:
        'this is a really really really really really long message to test what would happen to chat box',
    },
    {
      id: 12,
      username: 'kWh',
      message: 'less goooooo this song slaps',
    },
  ];
  // TODO: connect messages to backend to listen and update state?
  const onSubmit = () => {
    messages.push({
      id: messages.length + 1,
      username: currentUser.username,
      profilePicture: currentUser.profilePicture,
      message: message,
    });
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  const onMinimizeChat = () => {
    setIsOpen(val => !val);
  };

  return (
    <ChatContainer
      position="absolute"
      py="auto"
      width="20%"
      height={isOpen ? '460px' : '48px'}
      maxH="460px"
      minW="345px"
      shadow="base"
      rounded={{ sm: 'lg' }}
    >
      <HStack justifyContent="space-between" px={4} py={2}>
        <Heading fontSize="2xl">Chat</Heading>
        <IconButton
          onClick={onMinimizeChat}
          variant="ghost"
          size="sm"
          icon={
            isOpen ? (
              <VscChromeMinimize size="24px" />
            ) : (
              <FiMaximize2 size="24px" />
            )
          }
        />
      </HStack>

      {isOpen ? (
        <>
          <MessagesList messages={messages} />
          <HStack p="1rem">
            <Avatar size="xs" src={currentUser.profilePicture} alt="pfp" />
            <InputGroup>
              <Input
                onChange={event => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                variant="filled"
                placeholder="Message room"
                _placeholder={{ color: 'white' }}
              />
              <InputRightElement>
                <IconButton
                  onClick={onSubmit}
                  variant="ghost"
                  colorScheme="blue"
                  size="md"
                  icon={<IoMdSend size="28px" />}
                />
              </InputRightElement>
            </InputGroup>
          </HStack>
        </>
      ) : null}
    </ChatContainer>
  );
}

export default ChatBox;
