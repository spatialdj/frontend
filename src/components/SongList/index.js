import React from 'react';
import Song from '../SongCard/Song';
import { Grid } from '@chakra-ui/react';

function SongList({ list }) {
  return (
    <Grid>
      {list?.map(song => (
        <Song key={song.id} data={song} />
      ))}
    </Grid>
  );
}

export default SongList;
