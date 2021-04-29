import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

function JoinFailedModal(props) {
  const { isOpen, onClose, isAuth } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>⚠ View-Only Mode</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Because you&apos;re not logged in, your user Bubble won&apos;t appear
          on the screen. Still feel free to listen in!
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default JoinFailedModal;
