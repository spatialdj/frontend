import React from 'react';
import { useSelector } from 'react-redux';
import { Flex, Tooltip } from '@chakra-ui/react';

function VoteBar() {
  const votes = useSelector(state => state.vote);
  const numMembers = useSelector(
    state => Object.keys(state.currentRoom.data.members).length
  );
  const totalVotes = votes.likes + votes.dislikes;
  const likePercentage = Math.floor((votes.likes / totalVotes) * 100);
  const dislikePercentage = 100 - likePercentage;
  const numDislikesToSkip = Math.floor(numMembers / 2);
  const tooltipTabel =
    numDislikesToSkip - votes.dislikes <= 0
      ? 'Skipping song...'
      : `${numDislikesToSkip - votes.dislikes} more dislikes to skip`;

  if (!votes || totalVotes === 0) {
    return null;
  }

  return (
    <Flex w="100%" position="absolute" top="0" h="6px">
      <Flex
        flex={`${likePercentage}%`}
        bgGradient="linear(to-r, blue.300, blue.600)"
        boxShadow="0 0 20px 3px var(--chakra-colors-blue-300)"
      ></Flex>
      {votes.dislikes > 0 ? (
        <Tooltip
          placement="bottom-start"
          label={tooltipTabel}
          hasArrow
          isOpen={votes.dislikes / numDislikesToSkip >= 0.3}
        >
          <Flex
            flex={`${dislikePercentage}%`}
            bgGradient="linear(to-r, gray.600, gray.300)"
            boxShadow="0 0 20px 3px var(--chakra-colors-gray-500)"
          ></Flex>
        </Tooltip>
      ) : null}
    </Flex>
  );
}

export default VoteBar;
