/* eslint-disable react/display-name */
import React from 'react';
import Song from '../SongCard';
import { List, ListItem } from '@chakra-ui/react';
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
      style={{ ...provided.draggableProps.style, marginBottom: 5 }}
    >
      {
        <Song
          selectedPlaylist={selectedPlaylist}
          key={song.id}
          data={song}
          isInSearch={isInSearch}
        />
      }
    </div>
  );
};

function SongList({ selectedPlaylist, list, isInSearch, handleOnDragEnd }) {
  const renderItem = getRenderItem(selectedPlaylist, list, isInSearch);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="songList" renderClone={renderItem}>
        {(provided, snapshot) => (
          <List
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
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default SongList;
