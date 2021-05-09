import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from 'contexts/socket';
import { Button, Flex, useToast } from '@chakra-ui/react';
import styled from '@emotion/styled';

const ReactionsContainer = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(12, 22, 45, 0.5);
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

function Reactions() {
  const socket = useContext(SocketContext);
  const currentUser = useSelector(state => state.user);
  const toast = useToast();

  const submit = reaction => {
    return new Promise(resolve => {
      const timeSent = Date.now();
      const message = 'reacted with ' + reaction;
      socket.emit('chat_message', message, timeSent, response => {
        if (!response?.success) {
          toast({
            title: 'Error sending reaction',
            description: "Couldn't send your reaction",
            status: 'error',
            position: 'top-right',
            duration: 1000,
            isClosable: true,
          });
        }
      });
      socket.emit('reaction', reaction);
      resolve();
    });
  };

  // if user is not authenticated then do not display
  if (!currentUser.authenticated) {
    return null;
  }

  return (
    <ReactionsContainer>
      <Button variant="ghost" onClick={() => submit('🔥')}>
        🔥
      </Button>
      <Button variant="ghost" onClick={() => submit('😃')}>
        😃
      </Button>
      <Button variant="ghost" onClick={() => submit('😂')}>
        😂
      </Button>
      <Button variant="ghost" onClick={() => submit('😈')}>
        😈
      </Button>
      <Button variant="ghost" onClick={() => submit('💩')}>
        💩
      </Button>
      <Button variant="ghost" onClick={() => submit('🤮')}>
        🤮
      </Button>
    </ReactionsContainer>
  );
}

export default Reactions;
