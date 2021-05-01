import React from 'react';
import Song from '../SongCard';
import { List, ListItem } from '@chakra-ui/react';

function SongList({ list }) {
  return (
    <List overflowY="scroll" maxH="700px">
      {list?.map(song => (
        <ListItem key={song.id}>
          <Song key={song.id} data={song} />
        </ListItem>
      ))}
    </List>
  );
}

export default SongList;
