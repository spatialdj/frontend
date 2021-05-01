import React, { useRef, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import Message from './Message';

export default function MessagesList(props) {
  const messagesEnd = useRef({});
  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <Box
      style={{
        scrollbarColor: '#2D3748 #171923',
      }}
      pl="1rem"
      overflowY="scroll"
    >
      {props.messages.map(message => (
        <Message key={message.id} data={message} />
      ))}
      <div style={{ float: 'left', clear: 'both' }} ref={messagesEnd}></div>
    </Box>
  );
}
