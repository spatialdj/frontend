/* eslint-disable react/display-name */
import React from 'react';
import Song from '../SongCard';
import { Box } from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

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

function SongList({ selectedPlaylist, list, isInSearch, handleOnDragEnd }) {
  const renderItem = getRenderItem(selectedPlaylist, list, isInSearch);

  // For non-full height drawer and to fix offset bug
  // add renderClone={renderItem} to Droppable
  // Note: this will cause thumbnail image to flicker
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="songList" renderClone={renderItem}>
        {(provided, snapshot) => (
          <Box
            style={{
              scrollbarColor: '#404040 #000000',
            }}
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
