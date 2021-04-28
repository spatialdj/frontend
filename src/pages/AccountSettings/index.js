import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  FormHelperText,
  Textarea,
  Avatar,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

function AccountSettings() {
  const user = useSelector(state => state.user);
  const { profilePicture, username } = user;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const avatarUrl = useRef(profilePicture);
  const [avatarUrlState, setAvatarUrlState] = useState(profilePicture);

  useEffect(() => {
    setAvatarUrlState(profilePicture);
  }, [profilePicture]);

  const handleSaveAvatar = () => {
    setAvatarUrlState(avatarUrl.current);
    onClose();
  };

  const handleAvatarUrlChange = e => {
    avatarUrl.current = e.target.value;
  };

  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} color="white" p={10}>
      <chakra.form
        method="POST"
        shadow="base"
        rounded={[null, 'md']}
        overflow={{ sm: 'hidden' }}
      >
        <Stack
          px={4}
          py={5}
          bg={useColorModeValue('white', 'gray.900')}
          spacing={6}
          p={{ sm: 6 }}
        >
          <SimpleGrid columns={3} spacing={6}>
            <FormControl as={GridItem} colSpan={[3, 2]}>
              <FormLabel
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue('gray.700', 'gray.50')}
              >
                Username
              </FormLabel>
              <Input
                disabled={true}
                type="tel"
                placeholder="A cool name"
                value={username}
                rounded="md"
              />
            </FormControl>
          </SimpleGrid>

          <div>
            <FormControl id="email" mt={1}>
              <FormLabel
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue('gray.700', 'gray.50')}
              >
                About
              </FormLabel>
              <Textarea
                placeholder="Describe yourself"
                mt={1}
                rows={3}
                shadow="sm"
                fontSize={{ sm: 'sm' }}
              />
              <FormHelperText>
                Brief description for your profile.
              </FormHelperText>
            </FormControl>
          </div>

          <FormControl>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color={useColorModeValue('gray.700', 'gray.50')}
            >
              Photo
            </FormLabel>
            <Flex alignItems="center" mt={1}>
              <Avatar
                boxSize={12}
                bg={useColorModeValue('gray.100', 'gray.800')}
                src={avatarUrlState}
              />
              {isOpen ? (
                <Box ml={5} w="100%">
                  <InputGroup size="md">
                    <Input
                      defaultValue={avatarUrlState}
                      onChange={handleAvatarUrlChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleSaveAvatar}>
                        Done
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText>Enter an image URL</FormHelperText>
                </Box>
              ) : (
                <Button
                  onClick={onOpen}
                  type="button"
                  ml={5}
                  variant="outline"
                  size="sm"
                  fontWeight="medium"
                >
                  Change
                </Button>
              )}
            </Flex>
          </FormControl>
        </Stack>
        <Box
          px={{ base: 4, sm: 6 }}
          py={3}
          bg={useColorModeValue('gray.50', 'gray.900')}
        >
          <Button type="submit" colorScheme="blue" fontWeight="md">
            Save
          </Button>
        </Box>
      </chakra.form>
    </Box>
  );
}

export default AccountSettings;
