import { extendTheme } from '@chakra-ui/react';

export const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  styles: {
    global: props => ({
      body: {
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
};

const theme = extendTheme(config);

export default theme;
