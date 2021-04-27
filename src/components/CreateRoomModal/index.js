import React, { useRef } from 'react'
import {
  chakra,
  useColorModeValue,
  GridItem,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react"

function CreateRoomModal(props) {
  const {isOpen, onClose} = props;
  const initialRef = useRef();

  const handleCreateRoom = () => {
    // TODO: create the room
    // Remember to show a loading indicator
    // Send POST request
    // Open socket.io connection
    // Redirect to room
  }

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size='3xl'>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('white', 'gray.900')} color="white">
        <ModalHeader>Create Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <chakra.form
            method="POST"
            shadow="base"
            rounded={[null, 'md']}
            overflow={{sm: 'hidden'}}
          >
            <Stack
              px={4}
              py={5}
              spacing={6}
              p={{sm: 6}}
            >
              <FormControl as={GridItem} colSpan={[3, 2]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color={useColorModeValue('gray.700', 'gray.50')}
                >
                  Room name
              </FormLabel>
                <Input
                  ref={initialRef}
                  type="tel"
                  placeholder="A cool name"
                  rounded="md" />
              </FormControl>

              <div>
                <FormControl id="email" mt={1}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}
                  >
                    Description
              </FormLabel>
                  <Textarea
                    placeholder="We'll be listening to some cool tracks here"
                    mt={1}
                    rows={3}
                    shadow="sm"
                    fontSize={{sm: 'sm'}}
                  />
                  <FormHelperText>
                    Describe what you&apos;ll be doing in this room.
              </FormHelperText>
                </FormControl>
              </div>

              <FormControl>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color={useColorModeValue('gray.700', 'gray.50')}
                >
                  Tags
            </FormLabel>
            add tags here
            <FormHelperText>
                  Select up to three genres.
              </FormHelperText>
              </FormControl>
            </Stack>
          </chakra.form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreateRoom}>
            Create
            </Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateRoomModal
