import React, { useEffect } from 'react';
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

function YoutubePlayer(props) {
  const { id, height, width } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const loadVideo = () => {
    player = new window.YT.Player('youtube-player', {
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
