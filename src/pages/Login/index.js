import React from 'react';
import { useDispatch } from 'react-redux';
import { login, authenticate } from 'slices/userSlice';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import GradientBackground from 'components/GradientBackground';

const validateUsername = value => {
  return value ? true : 'Enter your username';
};

const validatePassword = value => {
  return value ? true : 'Enter your password';
};

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const toast = useToast();
  // Todo: make the callout to backend api on submit
  const onSubmit = data => {
    return dispatch(login(data)).then(res => {
      if (res.type === 'user/login/rejected') {
        toast({
          title: 'Login error',
          description: res?.error?.message ?? 'Please try again',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else if (res.type === 'user/login/fulfilled') {
        dispatch(authenticate());
      }
    });
  };

  return (
    <GradientBackground>
      <Box maxW="md" mx="auto" py="5%">
        <Heading textAlign="center" size="xl" padding="1rem">
          Login
        </Heading>
        <Box
          bg="gray.900"
          py="8"
          px={{ base: '4', md: '10' }}
          shadow="base"
          rounded={{ sm: 'lg' }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
              <FormControl isInvalid={errors.username}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  name="username"
                  {...register('username', { validate: validateUsername })}
                  placeholder="Username"
                  _placeholder={{ color: 'white' }}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    {...register('password', { validate: validatePassword })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    _placeholder={{ color: 'white' }}
                  />
                  <InputRightElement>
                    <IconButton
                      onClick={handleClick}
                      variant="ghost"
                      size="sm"
                      icon={showPassword ? <HiEyeOff /> : <HiEye />}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                isLoading={isSubmitting}
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </GradientBackground>
  );
}

export default Login;
