import React from 'react';
import {
  HStack,
  IconButton,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Text,
} from '@chakra-ui/react';
import { FaVolumeUp, FaVolumeDown, FaVolumeMute } from 'react-icons/fa';

function RightSide(props) {
  return (
    <HStack>
      <Text fontWeight="bold" mr="2rem">
        Current Playlist: {props.playlistName}
      </Text>
      <IconButton
        variant="ghost"
        icon={
          props.volume > 50 ? (
            <FaVolumeUp />
          ) : props.volume > 0 ? (
            <FaVolumeDown />
          ) : (
            <FaVolumeMute />
          )
        }
        mr="1rem"
      />
      <Slider onChangeEnd={val => props.changeVolume(val)} width="7rem">
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </HStack>
  );
}

export default RightSide;
