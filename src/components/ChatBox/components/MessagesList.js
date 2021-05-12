import React, { useRef, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import Message from './Message';
import '../index.css';

export default function MessagesList(props) {
  const { messages } = props;
  const messagesEnd = useRef({});

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      className="message-scrollbar"
      h="100%"
      w="100%"
      px="1rem"
      pt="1rem"
      overflowY="scroll"
    >
      {messages.map(message => (
        <Message key={message.id} data={message} />
      ))}
      <div style={{ float: 'left', clear: 'both' }} ref={messagesEnd}></div>
    </Box>
  );
}
