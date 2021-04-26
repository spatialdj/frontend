import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
};

const theme = extendTheme({ config });

export default theme;
