import React, { useEffect, useContext, useRef } from 'react';
import { ClientPositionContext } from 'contexts/clientposition';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

let player = null;

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

  if (volume >= 80) return linearTransform(volume, 0, 80, 0, 100);

  return volume;
};

const baseBoundingBox = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

function YoutubePlayer(props) {
  const { id, height, width } = props;
  const { clientPosition } = useContext(ClientPositionContext);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Autoplay modal
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
      player?.destroy();
      player = null;
    };
  }, []);

  // Handle proximity audio
  useEffect(() => {
    // The closer clientPosition is to youtube embed
    // the louder the volume gets.
    if (player?.setVolume) {
      const volume = calculateVolume(boundingBox.current, {
        x: clientPosition.x + X_OFFSET,
        y: clientPosition.y + Y_OFFSET,
      });
      // console.log(volume);
      player.setVolume(volume);
    }
  }, [clientPosition, player]);

  const loadVideo = () => {
    player = new window.YT.Player('youtube-player', {
      height: height,
      width: width,
      videoId: id,
      playerVars: {
        rel: 0,
        playsinline: 1,
        // controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        autoplay: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };

  const onPlayerReady = event => {
    // Open modal to allow autoplay videos
    onOpen();
    boundingBox.current = event.target.getIframe().getBoundingClientRect();
    console.log('boundingBox', boundingBox.current);
  };

  const onPlayerStateChange = event => {
    const { data } = event;
    switch (data) {
      case -1:
        console.log('YT unstarted -1');
        break;
      case 0:
        console.log('YT ended 0');
        break;
      case 1:
        console.log('YT playing 1');
        break;
      case 2:
        console.log('YT paused 2');
        break;
      case 3:
        console.log('YT buffering 3');
        break;
      case 5:
        console.log('YT cued 5');
        break;
      default:
        break;
    }
  };

  const onGrantAutoplay = () => {
    if (player) {
      player.playVideo();
      onClose();
    }
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
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Allow autoplay</ModalHeader>
          <ModalBody>Click the button to let us autoplay videos 👇</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onGrantAutoplay}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default YoutubePlayer;
