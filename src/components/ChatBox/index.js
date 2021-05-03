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
  Flex,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { IoMdSend } from 'react-icons/io';
import { VscChromeMinimize } from 'react-icons/vsc';
import { FiMaximize2 } from 'react-icons/fi';
import styled from '@emotion/styled';
import MessagesList from './components/MessagesList';

const ChatContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
  bottom: 80px;
  right: 0;
  background-color: rgba(12, 22, 45, 0.5);
`;

function ChatBox() {
  const currentUser = useSelector(state => state.user);
  const {
    register,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm();
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  // TODO: connect messages to backend to listen and update state?
  const mySubmit = e => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  const onSubmit = data => {
    const { message } = data;
    if (message !== '') {
      setMessages(messages => [
        ...messages,
        {
          id: messages.length + 1,
          username: currentUser.username,
          profilePicture: currentUser.profilePicture,
          message: message,
        },
      ]);
      reset({ message: '' });
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
      <HStack maxH="48px" justifyContent="space-between" px={4} py={2}>
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
            <form
              style={{ width: '100%' }}
              onSubmit={mySubmit}
              autoComplete="off"
            >
              <InputGroup>
                <Input
                  id="message"
                  type="text"
                  {...register('message')}
                  variant="filled"
                  placeholder="Message room"
                />
                <InputRightElement>
                  <IconButton
                    isLoading={isSubmitting}
                    type="submit"
                    variant="ghost"
                    colorScheme="blue"
                    size="md"
                    icon={<IoMdSend size="28px" />}
                  />
                </InputRightElement>
              </InputGroup>
            </form>
          </HStack>
        </>
      ) : null}
    </ChatContainer>
  );
}

export default ChatBox;
