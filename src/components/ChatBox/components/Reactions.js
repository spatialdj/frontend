import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from 'contexts/socket';
import { Button, Flex, Tooltip, useToast } from '@chakra-ui/react';
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
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const toast = useToast();

  const submit = reaction => {
    return new Promise(resolve => {
      // Disabled button for 5 seconds to prevent spamming
      setButtonDisabled(true);
      setTimeout(() => setButtonDisabled(false), 5500);

      // Send reaction socket event
      const timeSent = Date.now();
      const message = 'reacted with ' + reaction;
      socket.emit('reaction', reaction);

      // Sent chat message socket event
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
      resolve();
    });
  };

  // if user is not authenticated then do not display
  if (!currentUser.authenticated) {
    return null;
  }

  return (
    <Tooltip
      isDisabled={!buttonDisabled}
      hasArrow
      placement="top"
      label="Please wait a few seconds before reacting again!"
      bg="#0c162d"
      color="white"
    >
      <ReactionsContainer>
        <Button
          isDisabled={buttonDisabled}
          variant="ghost"
          onClick={() => submit('🔥')}
        >
          🔥
        </Button>
        <Button
          isDisabled={buttonDisabled}
          variant="ghost"
          onClick={() => submit('😃')}
        >
          😃
        </Button>
        <Button
          isDisabled={buttonDisabled}
          variant="ghost"
          onClick={() => submit('😂')}
        >
          😂
        </Button>
        <Button
          isDisabled={buttonDisabled}
          variant="ghost"
          onClick={() => submit('😈')}
        >
          😈
        </Button>
        <Button
          isDisabled={buttonDisabled}
          variant="ghost"
          onClick={() => submit('💩')}
        >
          💩
        </Button>
        <Button
          isDisabled={buttonDisabled}
          variant="ghost"
          onClick={() => submit('🤮')}
        >
          🤮
        </Button>
      </ReactionsContainer>
    </Tooltip>
  );
}

export default Reactions;
