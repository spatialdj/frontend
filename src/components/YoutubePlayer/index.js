import React, { useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeVolume,
  reportError,
  clearError,
  playSong,
  stopSong,
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
  // console.log({dx, dy});
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
  const { isAuth, id, height, width, currentSongNumber } = props;
  const { clientPosition } = useContext(ClientPositionContext);
  const dispatch = useDispatch();
  const volume = useSelector(state => state.youtube.volume);
  const player = useRef(null);
  const boundingBox = useRef(baseBoundingBox);

  useEffect(() => {
    // Code adapted from Bill Feng:
    // https://stackoverflow.com/a/54921282/6216561
    // On mount, check to see if the API script is already loaded
    if (!window.YT) {
      // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      // If script is already there, load the video directly
      loadVideo();
    }
    return () => {
      console.log('YoutubePlayer unmounted');
      // Destroy player object
      player.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentSongNumber]);

  // Handle proximity audio
  useEffect(() => {
    // The closer clientPosition is to youtube embed
    // the louder the volume gets.
    const volume = calculateVolume(boundingBox.current, {
      x: clientPosition.x + X_OFFSET,
      y: clientPosition.y + Y_OFFSET,
    });
    // console.log(volume);
    dispatch(changeVolume(volume));
  }, [clientPosition, player, dispatch]);

  useEffect(() => {
    if (player.current?.setVolume) {
      player.current.setVolume(volume);
    }
  }, [volume]);

  const loadVideo = () => {
    player.current = new window.YT.Player('youtube-player', {
      height: height,
      width: width,
      videoId: id,
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
  };

  const onPlayerReady = event => {
    event.target.playVideo();
    console.log('isAuth', isAuth);
    if (!isAuth) {
      // Set player volume for non authed users,
      // because they can't control volume by moving bubble
      dispatch(changeVolume(100));
    }
    boundingBox.current = event.target.getIframe().getBoundingClientRect();
    console.log('boundingBox', boundingBox.current);
  };

  const onPlayerStateChange = event => {
    const { data } = event;
    console.log('onPlayerStateChange', data);
    switch (data) {
      case -1:
        dispatch(clearError());
        break;
      case 0:
        dispatch(stopSong());
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
  };

  const onError = event => {
    const { data } = event;
    console.log('onError', data);
    dispatch(reportError(data));
  };

  return (
    <>
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        m="auto"
        borderRadius="0 0 8px 8px"
        border="1px solid"
        borderTop="none"
        borderColor="blue.300"
        id="youtube-player"
      />
      <ErrorBox height={height} width={width} />
    </>
  );
}

export default YoutubePlayer;
