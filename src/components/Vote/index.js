import React, { useContext, useRef, useState } from 'react';
import { SocketContext } from 'contexts/socket';
import { useSelector, useDispatch } from 'react-redux';
import { clientLike, clientSave, clientDislike } from 'slices/voteSlice';
import { Flex, IconButton, ButtonGroup } from '@chakra-ui/react';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styled from '@emotion/styled';
import throttle from 'utils/throttle';
import { addSong, removeSong } from 'slices/playlistsSlice';
import {
  addSong as saveToPlaylist,
  removeSong as removeSave,
} from 'services/playlist.js';

const BottomLeft = styled(Flex)`
  flex-direction: column;
  align-self: flex-start;
  margin-top: auto;
  pointer-events: auto;
`;

function Vote() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const authenticated = useSelector(state => state.user.authenticated);
  const currentSong = useSelector(state => state.queue.currentSong);
  const selectedPlaylistId = useSelector(
    state => state.playlists.selectedPlaylist
  );
  const vote = useSelector(state => state.vote);
  const { clientVote, clientSaved } = vote;
  const [saveSongLoading, setSaveSongLoading] = useState(false);

  const like = () => {
    socket.emit('vote', 'like');
    dispatch(clientLike());
  };

  const saveSong = async () => {
    setSaveSongLoading(true);
    dispatch(clientSave());

    if (clientSaved && currentSong) {
      dispatch(
        removeSong({ playlistId: selectedPlaylistId, id: currentSong.id })
      );
      const res = await removeSave(selectedPlaylistId, {
        songId: currentSong.id,
      });
      if (res.status === 200) {
        setSaveSongLoading(false);
      } else {
        // Handle save fail
      }
    } else {
      dispatch(addSong({ playlistId: selectedPlaylistId, song: currentSong }));
      const res = await saveToPlaylist(selectedPlaylistId, {
        song: currentSong,
      });
      if (res.status === 200) {
        setSaveSongLoading(false);
      } else {
        // Handle save fail
      }
    }
  };

  const dislike = () => {
    socket.emit('vote', 'dislike');
    dispatch(clientDislike());
  };
  const likeSong = useRef(throttle(like, 250));
  const dislikeSong = useRef(throttle(dislike, 250));

  if (!currentSong || !authenticated) return <div></div>;

  return (
    <BottomLeft>
      <ButtonGroup size="lg" isAttached>
        <IconButton
          onClick={likeSong.current}
          colorScheme={clientVote === 'like' ? 'blue' : 'gray'}
          aria-label="Like this song"
          icon={<IoMdThumbsUp />}
        />
        <IconButton
          isLoading={saveSongLoading}
          onClick={saveSong}
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
    </BottomLeft>
  );
}

export default Vote;
