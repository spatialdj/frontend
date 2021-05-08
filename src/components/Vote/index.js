import React, { useContext } from 'react';
import { SocketContext } from 'contexts/socket';
import { useSelector, useDispatch } from 'react-redux';
import { clientLike, clientSave, clientDislike } from 'slices/voteSlice';
import { Box, IconButton, ButtonGroup } from '@chakra-ui/react';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function Vote() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const vote = useSelector(state => state.vote);
  const { clientVote, clientSaved } = vote;

  const likeSong = () => {
    socket.emit('vote', 'like');
    dispatch(clientLike());
  };

  const saveSong = () => {
    dispatch(clientSave());
  };

  const dislikeSong = () => {
    socket.emit('vote', 'dislike');
    dispatch(clientDislike());
  };

  return (
    <Box position="absolute" bottom="80px">
      <ButtonGroup size="lg" isAttached>
        <IconButton
          onClick={likeSong}
          colorScheme={clientVote === 'like' ? 'blue' : 'gray'}
          aria-label="Like this song"
          icon={<IoMdThumbsUp />}
        />
        <IconButton
          onClick={saveSong}
          colorScheme={clientSaved ? 'yellow' : 'gray'}
          aria-label="Save this song"
          icon={clientSaved ? <AiFillStar /> : <AiOutlineStar />}
        />
        <IconButton
          onClick={dislikeSong}
          colorScheme={clientVote === 'dislike' ? 'blue' : 'gray'}
          aria-label="Dislike this song"
          icon={<IoMdThumbsDown />}
        />
      </ButtonGroup>
    </Box>
  );
}

export default Vote;
