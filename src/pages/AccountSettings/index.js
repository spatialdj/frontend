import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update, authenticate } from 'slices/userSlice';
import {
  chakra,
  Container,
  Box,
  Flex,
  useColorModeValue,
  GridItem,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  FormHelperText,
  FormErrorMessage,
  Textarea,
  Avatar,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';

const validateAvatar = value => {
  return value.match(
    /^http[^?]*.(jpg|jpeg|gif|png|tiff|bmp|webp|svg)(\?(.*))?$/gim
  ) != null
    ? true
    : 'Enter a valid image url';
};

function AccountSettings() {
  const user = useSelector(state => state.user);
  const { profilePicture, username } = user;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const avatarUrl = useRef(profilePicture);
  const [avatarUrlState, setAvatarUrlState] = useState(profilePicture);
  const toast = useToast();

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

  const onSubmit = data => {
    const dataToSubmit = {
      profilePicture: data?.profilePicture ?? profilePicture,
    };
    return dispatch(update(dataToSubmit)).then(res => {
      if (res.type === 'user/update/rejected') {
        toast({
          title: 'Account update error',
          description: res?.error?.message ?? 'Please try again',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else if (res.type === 'user/update/fulfilled') {
        dispatch(authenticate());
      }
    });
  };

  return (
    <Container
      maxW={{
        base: 'container.sm',
        sm: 'container.sm',
        md: 'container.md',
        lg: 'container.lg',
        xl: 'container.xl',
      }}
      bg={useColorModeValue('gray.50', 'inherit')}
      color="white"
      p={10}
    >
      <Helmet>
        <title>My Account - Spatial.dj</title>
      </Helmet>
      <chakra.form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        shadow="base"
        rounded="md"
        overflow={{ sm: 'hidden' }}
      >
        <Stack
          px={4}
          py={5}
          bg={useColorModeValue('white', 'gray.900')}
          spacing={6}
          p={{ sm: 6 }}
        >
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

          {/* <div>
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
          </div> */}

          <FormControl isInvalid={errors.profilePicture}>
            <FormLabel
              htmlFor="profilepicture-url"
              fontSize="sm"
              fontWeight="md"
              color={useColorModeValue('gray.700', 'gray.50')}
            >
              Profile Picture
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
                      id="profilepicture-url"
                      {...register('profilePicture', {
                        validate: validateAvatar,
                      })}
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
            <FormErrorMessage>
              {errors.profilePicture && errors.profilePicture.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Box
          px={{ base: 4, sm: 6 }}
          py={3}
          bg={useColorModeValue('gray.50', 'gray.900')}
        >
          <Button
            isLoading={isSubmitting}
            type="submit"
            colorScheme="blue"
            fontWeight="md"
          >
            Save
          </Button>
        </Box>
      </chakra.form>
    </Container>
  );
}

export default AccountSettings;
