import React from 'react';
import { useSelector } from 'react-redux';
import ErrorContainer from './ErrorContainer';
import ErrorMessage from './ErrorMessage';
import EmptyQueueMessage from './EmptyQueueMessage';
import NextSongLoadingMessage from './NextSongLoadingMessage';

function ErrorBox(props) {
  const { height, width } = props;
  const ytStatus = useSelector(state => state.youtube.status);
  const ytErrorCode = useSelector(state => state.youtube.errorCode);
  const queueState = useSelector(state => state.queue);
  const { queue, inQueue, status: queueStatus } = queueState;

  // Show when youtube player encountered error and there are people in queue
  if (ytErrorCode != null && queue.length > 0 && !inQueue) {
    return (
      <ErrorContainer width={width} height={height} borderColor="red.500">
        <ErrorMessage />
      </ErrorContainer>
    );
  }
  // Show when youtube player encountered error and no one in queue
  else if (queueStatus === 'success' && queue.length === 0) {
    return (
      <ErrorContainer width={width} height={height} borderColor="yellow.500">
        <EmptyQueueMessage />
      </ErrorContainer>
    );
  }
  // Show when youtube has no error and current song ended and queue not empty
  else if (ytErrorCode === null && ytStatus === 'ended') {
    return (
      <ErrorContainer width={width} height={height} borderColor="blue.500">
        <NextSongLoadingMessage />
      </ErrorContainer>
    );
  }
  // Show nothing when everything is working
  else {
    return null;
  }
}

export default ErrorBox;
