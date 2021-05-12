import React from 'react';
import { useSelector } from 'react-redux';
import { Flex, Tooltip } from '@chakra-ui/react';

function VoteBar() {
  const votes = useSelector(state => state.vote);
  const numMembers = useSelector(state => state.currentRoom.data.numMembers);
  const currentSong = useSelector(state => state.queue.currentSong);
  const totalVotes = votes.likes + votes.dislikes;
  const likePercentage = (votes.likes / numMembers) * 100;
  const dislikePercentage = (votes.dislikes / numMembers) * 100;
  const numDislikesToSkip = Math.ceil(numMembers / 2);
  const tooltipLabel =
    numDislikesToSkip - votes.dislikes <= 0
      ? 'Skipping song...'
      : `${numDislikesToSkip - votes.dislikes} more dislikes to skip`;

  if (!votes || totalVotes === 0 || !currentSong) {
    return null;
  }

  return (
    <Flex w="100%" position="absolute" top="0" h="6px">
      <Flex
        w={`${likePercentage}%`}
        bgGradient="linear(to-r, blue.300, blue.600)"
        boxShadow="0 0 20px 3px var(--chakra-colors-blue-300)"
      ></Flex>
      {votes.dislikes > 0 ? (
        <Tooltip
          placement="auto"
          label={tooltipLabel}
          hasArrow
          isOpen={votes.dislikes / numDislikesToSkip >= 0.3}
        >
          <Flex
            ml="auto"
            w={`${dislikePercentage}%`}
            bgGradient="linear(to-r, gray.600, gray.300)"
            boxShadow="0 0 20px 3px var(--chakra-colors-gray-500)"
          ></Flex>
        </Tooltip>
      ) : null}
    </Flex>
  );
}

export default VoteBar;
