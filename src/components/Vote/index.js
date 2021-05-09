import React, { useContext, useRef } from 'react';
import { SocketContext } from 'contexts/socket';
import { useSelector, useDispatch } from 'react-redux';
import { clientLike, clientSave, clientDislike } from 'slices/voteSlice';
import { Box, IconButton, ButtonGroup } from '@chakra-ui/react';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import throttle from 'utils/throttle';

function Vote() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const like = () => {
    socket.emit('vote', 'like');
    dispatch(clientLike());
  };

  const save = () => {
    dispatch(clientSave());
  };

  const dislike = () => {
    socket.emit('vote', 'dislike');
    dispatch(clientDislike());
  };
  const likeSong = useRef(throttle(like, 250));
  const saveSong = useRef(throttle(save, 250));
  const dislikeSong = useRef(throttle(dislike, 250));
  const vote = useSelector(state => state.vote);
  const currentSong = useSelector(state => state.queue.currentSong);
  const { clientVote, clientSaved } = vote;

  if (!currentSong) return null;

  return (
    <Box position="absolute" bottom="80px">
      <ButtonGroup size="lg" isAttached>
        <IconButton
          onClick={likeSong.current}
          colorScheme={clientVote === 'like' ? 'blue' : 'gray'}
          aria-label="Like this song"
          icon={<IoMdThumbsUp />}
        />
        <IconButton
          onClick={saveSong.current}
          colorScheme={clientSaved ? 'yellow' : 'gray'}
          aria-label="Save this song"
          icon={clientSaved ? <AiFillStar /> : <AiOutlineStar />}
        />
        <IconButton
          onClick={dislikeSong.current}
          colorScheme={clientVote === 'dislike' ? 'blue' : 'gray'}
          aria-label="Dislike this song"
          icon={<IoMdThumbsDown />}
        />
      </ButtonGroup>
    </Box>
  );
}

export default Vote;
