import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import GradientBackground from 'components/GradientBackground';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [showConfirmPW, setShowConfirmPW] = useState(false);
  const handleShowConfirmPW = () => setShowConfirmPW(!showConfirmPW);

  const [passwordValue, setPasswordValue] = useState('');

  const validateUsername = value => {
    return value ? true : 'Enter your username';
  };

  const validatePassword = value => {
    return value ? true : 'Enter your password';
  };

  const validateConfirmPW = value => {
    if (!value) {
      return 'Confirm your password';
    } else if (value !== passwordValue) {
      return 'Passwords do not match';
    } else {
      return true;
    }
  };

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <GradientBackground>
      <Box maxW="md" mx="auto" py="5%">
        <Heading textAlign="center" size="xl" padding="1rem">
          Register
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
                  id="username"
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
                    id="password"
                    {...register('password', { validate: validatePassword })}
                    onChange={event => setPasswordValue(event.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    _placeholder={{ color: 'white' }}
                  />
                  <InputRightElement>
                    <IconButton
                      onClick={handleShowPassword}
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
              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <InputGroup>
                  <Input
                    id="confirmPassword"
                    {...register('confirmPassword', {
                      validate: validateConfirmPW,
                    })}
                    type={showConfirmPW ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    _placeholder={{ color: 'white' }}
                  />
                  <InputRightElement>
                    <IconButton
                      onClick={handleShowConfirmPW}
                      variant="ghost"
                      size="sm"
                      icon={showConfirmPW ? <HiEyeOff /> : <HiEye />}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                isLoading={isSubmitting}
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
              >
                Register
              </Button>
              <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
                <Text as="span">Already have an account? </Text>
                <Link color="blue.200" as={ReactLink} to="/login">
                  Login here.
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Box>
    </GradientBackground>
  );
}

export default Register;
