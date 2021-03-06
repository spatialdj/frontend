/* eslint-disable react/display-name */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Song from '../SongCard';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { updatePlaylist } from 'slices/playlistsSlice';
import * as playlistAPI from 'services/playlist.js';

const getRenderItem = (selectedPlaylist, list, isInSearch) => (
  provided,
  snapshot,
  rubric
) => {
  const song = list[rubric.source.index];

  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={{ ...provided.draggableProps.style, marginBottom: '0.5rem' }}
    >
      <Song
        selectedPlaylist={selectedPlaylist}
        key={song.id}
        data={song}
        isInSearch={isInSearch}
      />
    </div>
  );
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function SongList() {
  const selectedPlaylist =
    useSelector(
      state => state.playlists?.playlists?.[state.playlists?.selectedPlaylist]
    ) ?? {};
  const songSearch = useSelector(state => state.songSearch);
  const { status, results } = songSearch;

  const isInSearch = status !== 'idle';
  const list = isInSearch ? results : selectedPlaylist?.queue ?? [];

  const dispatch = useDispatch();
  const renderItem = getRenderItem(selectedPlaylist.id, list, isInSearch);

  const handleOnDragEnd = async result => {
    if (!result.destination || !selectedPlaylist) {
      return;
    }

    const reorderedSongs = reorder(
      selectedPlaylist?.queue ?? [],
      result.source.index,
      result.destination.index
    );
    const newPlaylist = {
      id: selectedPlaylist.id,
      name: selectedPlaylist.name,
      user: selectedPlaylist.user,
      queue: reorderedSongs,
    };

    dispatch(updatePlaylist({ playlist: newPlaylist }));

    const res = await playlistAPI.update(newPlaylist.id, newPlaylist);

    if (res.status !== 200) {
      // todo: failed to rearrange playlist
    }
  };

  if (status === 'loading') {
    return (
      <Center height="475px">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.300"
          size="xl"
        />
      </Center>
    );
  }

  // For non-full height drawer and to fix offset bug
  // add renderClone={renderItem} to Droppable
  // Note: this will cause thumbnail image to flicker
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="songList" renderClone={renderItem}>
        {(provided, snapshot) => (
          <Box
            className="dark-scrollbar"
            overflowY="auto"
            h="475px"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list?.map((song, index) => (
              <Draggable
                key={song.id}
                draggableId={song.id}
                index={index}
                isDragDisabled={isInSearch}
              >
                {renderItem}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default SongList;
