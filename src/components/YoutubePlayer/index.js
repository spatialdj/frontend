import React, { useEffect, useContext, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from 'contexts/socket';
import {
  changeVolume,
  reportError,
  clearError,
  playSong,
  endSong,
  stopSong,
  youtubeAPIReady
} from 'slices/youtubeSlice';
import { ClientPositionContext } from 'contexts/clientposition';
import { Box } from '@chakra-ui/react';
import ErrorBox from './components/ErrorBox';

// Adjusts for circle size, which is 64x64 + 4px of border
const X_OFFSET = 32 + 4;
// When in doubt, add 330 to this number?
const Y_OFFSET = X_OFFSET;

/**
 * Maps `val`, which is between `a` and `b` to a number between `c` and `d`
 * @param {number} val
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} d
 * @returns {number} a number between `c` and `d`
 */
const linearTransform = (val, a, b, c, d) => {
  return Math.min(((val - a) / (b - a)) * (d - c) + c, 100);
};

const maxUnscaledDistance = Math.sqrt(100 * 100 + 100 * 100);

/**
 * Calculates volume given player bounding box and client position
 * @param {object} boundingBox
 * @param {{x: number, y: number}} position
 * @returns {number} volume, from 0 to 100 inclusive
 */
const calculateVolume = (boundingBox, position) => {
  const { left, bottom, right } = boundingBox;
  const { x, y } = position;

  // Distance from left/right/bottom edge
  let dx = Math.max(left - x, 0, x - right);
  let dy = Math.max(y - bottom, 0);

  dx = linearTransform(dx, 0, left, 0, 100);
  dy = linearTransform(dy, 0, bottom, 0, 100);

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 0) {
    return 100;
  }

  const rescaledVolume = linearTransform(
    distance,
    0,
    maxUnscaledDistance,
    0,
    100
  );

  const volume = 100 - rescaledVolume;

  if (volume >= 90) return linearTransform(volume, 0, 90, 0, 100);

  return volume;
};

const baseBoundingBox = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

function YoutubePlayer(props) {
  const { isAuth, height, width } = props;
  const { clientPosition } = useContext(ClientPositionContext);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const volume = useSelector(state => state.youtube.volume);
  const player = useRef(null);
  const boundingBox = useRef(baseBoundingBox);
  const song = useSelector(state => state.currentRoom.data.currentSong);
  const isYouTubeAPIReady = useSelector(state => state.youtube.isYouTubeAPIReady)

  const onError = useCallback(event => {
    const { data } = event;

    dispatch(reportError(data));
  }, [dispatch])

  const onPlayerStateChange = useCallback(event => {
    const { data } = event;

    switch (data) {
      case -1:
        dispatch(clearError());
        break;
      case 0:
        dispatch(endSong());
        dispatch(clearError());
        break;
      case 1:
        dispatch(playSong());
        break;
      case 2:
        dispatch(clearError());
        break;
      case 3:
        dispatch(clearError());
        break;
      case 5:
        dispatch(clearError());
        break;
      default:
        break;
    }
  }, [dispatch])

  const onPlayerReady = useCallback(event => {
    event.target.playVideo();

    if (!isAuth) {
      // Set player volume for non authed users,
      // because they can't control volume by moving bubble
      dispatch(changeVolume(50));
    }

    boundingBox.current = event.target.getIframe().getBoundingClientRect();
  }, [dispatch, isAuth])

  const createPlayer = useCallback(() => {
    player.current = new window.YT.Player('youtube-player', {
      height: height,
      width: width,
      videoId: song?.videoId,
      playerVars: {
        rel: 0,
        playsinline: 1,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        autoplay: 1,
        iv_load_policy: 3,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onError,
      },
    });
  }, [height, width, song, onPlayerReady, onPlayerStateChange, onError])

  function updateSong(song) {
    if (song?.videoId == null) {
      if (player.current.stopVideo) {
        player.current.stopVideo();
      }

      return;
    }

    if (player.current.loadVideoById && player.current.playVideo) {
      player.current.loadVideoById(song.videoId);
      player.current.seekTo(0);
    }
  }

  useEffect(() => {
    // callback for youtube iframe api
    window.onYouTubeIframeAPIReady = () => {
      dispatch(youtubeAPIReady())
    }

    // if youtube iframe api was loaded before
    if (isYouTubeAPIReady) {
      if (!song) {
        return
      }

      // create a youtube player if there isn't already one
      if (!player.current) {
        createPlayer();
      } else {
        // reuse the old youtube player
        updateSong(song);
      }

      return;
    }

    // Code adapted from Bill Feng:
    // https://stackoverflow.com/a/54921282/6216561
    // On mount, check to see if the API script is already loaded
    if (!window.YT) {
      // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, [isYouTubeAPIReady, song, createPlayer, dispatch]);

  // cleanup hook
  useEffect(() => {
    return () => {
      // Destroy player object
      player.current?.destroy();
    };
  }, []);

  // Handle proximity audio
  useEffect(() => {
    // The closer clientPosition is to youtube embed
    // the louder the volume gets.
    const volume = calculateVolume(boundingBox.current, {
      x: clientPosition.x + X_OFFSET,
      y: clientPosition.y + Y_OFFSET,
    });

    dispatch(changeVolume(volume));
  }, [clientPosition, player, dispatch]);

  useEffect(() => {
    if (player.current?.setVolume) {
      player.current.setVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    socket.on('sync_song', data => {
      const seekTimeSec = data.seekTime / 1000;

      if (
        player.current?.getCurrentTime &&
        Math.abs(player.current.getCurrentTime() - seekTimeSec) > 2
      ) {
        player.current.seekTo(seekTimeSec);
      }
    });

    socket.on('stop_song', () => {
      // Sent when current song ends AND there are no more users in queue
      player.current?.stopVideo();
      dispatch(stopSong());
    });

    return () => {
      socket.removeAllListeners('sync_song');
      socket.removeAllListeners('stop_song');
    };
  }, [dispatch, player, socket]);

  return (
    <>
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        m="auto"
        borderRadius="0 0 8px 8px"
        id="youtube-player"
      />
      <ErrorBox height={height} width={width} />
    </>
  );
}

export default YoutubePlayer;
