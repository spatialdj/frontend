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

// Adjusts for circle size, which is 64x64
const X_OFFSET = 32;
// For some reason, top of the page y = -330?
const Y_OFFSET = -330 + X_OFFSET;

/**
 * Calculates distance from point to an edge defined by 2 points
 * @param {{x: number, y: number}[]} edge
 * @param {{x: number, y: number}} point
 * @returns {number} distance
 */
const calculateDistanceToEdge = (edge, point) => {
  const p1 = edge[0];
  const p2 = edge[1];
  return (
    Math.abs(
      (p2.x - p1.x) * (p1.y - point.y) - (p1.x - point.x) * (p2.y - p1.y)
    ) / Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
  );
};

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

/**
 * Calculates volume given player corner position and client position
 * @param {{x: number, y: number}[]} corners
 * @param {{x: number, y: number}} position
 * @returns {number} volume, from 0 to 100 inclusive
 */
const calculateVolume = (corners, position) => {
  const distanceToEdges = [
    calculateDistanceToEdge([corners[0], corners[1]], position), // left
    calculateDistanceToEdge([corners[1], corners[3]], position), // bottom
    calculateDistanceToEdge([corners[2], corners[3]], position), // right
  ];
  // Sort ascending
  distanceToEdges.sort((a, b) => a - b);
  // Inverse square law modelling
  const squareRootDist = Math.floor(Math.sqrt(distanceToEdges[0]));
  // Apply linear transform to map to a value from 0 to 100
  const transformedDist = 100 - linearTransform(squareRootDist, 0, 28, 0, 100);
  // Constraints
  if (transformedDist >= 80) {
    // Set max volume if we're close
    return 100;
  } else if (transformedDist <= 20) {
    // Mute if we're far
    return 0;
  } else {
    return transformedDist;
  }
};

const baseCorners = [
  { x: 0, y: 0 }, // top left
  { x: 0, y: 390 }, // bottom left
  { x: 0 + 640, y: 0 }, // top right
  { x: 0 + 640, y: 390 }, // bottom right
];

function YoutubePlayer(props) {
  const { id, height, width } = props;
  const { clientPosition } = useContext(ClientPositionContext);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Autoplay modal
  const corners = useRef(baseCorners);

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
      player.destroy();
      player = null;
    };
  }, []);

  // Handle proximity audio
  useEffect(() => {
    // The closer clientPosition is to youtube embed
    // the louder the volume gets.
    if (player?.setVolume) {
      const volume = calculateVolume(corners.current, {
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
    // Calculate corners
    const offsetLeft = parseInt(event.target.getIframe().offsetLeft);
    const h = parseInt(height);
    const w = parseInt(width);
    const computedCorners = [
      { x: offsetLeft, y: 0 }, // top left
      { x: offsetLeft, y: h }, // bottom left
      { x: offsetLeft + w, y: 0 }, // top right
      { x: offsetLeft + w, y: h }, // bottom right
    ];
    corners.current = computedCorners;
    console.log('iframe corners', corners.current);
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
