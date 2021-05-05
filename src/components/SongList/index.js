import React from 'react';
import Song from '../SongCard';
import { List, ListItem, Portal } from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

const DraggableListItem = styled(ListItem)`
  top: auto !important;
`;

function SongList({ selectedPlaylist, list, isInSearch, handleOnDragEnd }) {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="songList">
        {provided => (
          <List
            style={{
              scrollbarColor: '#404040 #000000',
            }}
            overflowY="scroll"
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
                {provided => (
                  <DraggableListItem
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <Song selectedPlaylist={selectedPlaylist} key={song.id} data={song} isInSearch={isInSearch} />
                  </DraggableListItem>
                )}
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
