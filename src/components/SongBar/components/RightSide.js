import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import he from 'he';
import { changeVolume, muteVideo } from 'slices/youtubeSlice';
import {
  HStack,
  IconButton,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Text,
  Icon,
  Flex,
} from '@chakra-ui/react';
import {
  ImVolumeHigh,
  ImVolumeMedium,
  ImVolumeLow,
  ImVolumeMute2,
} from 'react-icons/im';
import { BiBarChart } from 'react-icons/bi';
import './marquee.css';

function RightSide() {
  const lastVolumeRef = useRef(50);
  const dispatch = useDispatch();
  const volume = useSelector(state => state.youtube.volume);
  const currentSong = useSelector(state => state.queue.currentSong);

  const handleMute = e => {
    e.preventDefault();
    if (volume === 0) {
      dispatch(changeVolume(lastVolumeRef.current));
    } else {
      lastVolumeRef.current = volume;
      dispatch(muteVideo());
    }
  };

  const handleChangeVolume = val => {
    dispatch(changeVolume(val));
  };

  return (
    <HStack>
      {currentSong != null ? (
        <>
          <Icon as={BiBarChart} />
          <Flex w="300px" overflow="hidden">
            <Text
              fontWeight="bold"
              mr={2}
              className="marquee"
              whiteSpace="nowrap"
            >
              {he.decode(currentSong?.title ?? '')}
            </Text>
          </Flex>
        </>
      ) : null}
      <IconButton
        onClick={handleMute}
        variant="ghost"
        icon={
          volume > 70 ? (
            <ImVolumeHigh />
          ) : volume > 25 ? (
            <ImVolumeMedium />
          ) : volume > 0 ? (
            <ImVolumeLow />
          ) : (
            <ImVolumeMute2 />
          )
        }
        mr="1rem"
      />
      <Slider
        aria-label="volume-slider"
        value={volume}
        step={1}
        min={0}
        max={100}
        onChange={handleChangeVolume}
        width="7rem"
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </HStack>
  );
}

export default RightSide;
