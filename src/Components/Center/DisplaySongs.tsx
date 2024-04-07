import React, { useContext } from 'react'
import { RightPaneContext } from '../../Contexts/RightPaneContext';
import { ActiveSongContext } from '../../Contexts/ActiveSongContext';
import { ActiveSongContextType, RightPaneContextType, Song } from '../Types';

type DisplaySongsProps = {
  songs: Song[];
  componentType: string;
}

function DisplaySongs({songs,componentType} : DisplaySongsProps) {
    const {handleActiveSong} = useContext(ActiveSongContext) as ActiveSongContextType;
    const {handleRightPaneClick} = useContext(RightPaneContext) as RightPaneContextType;
  return (
    <div className={`${componentType}s-container`}>
        {songs.map((song:Song) => {
            const {id,songName , singerName , imgUrl} = song;
          return (
            <div key={id} className={`${componentType}-template`}>
              <div className={`${componentType}-card flex-column justify-center align-center`}>
                <img
                  data-testid={`center-song-image-${songName}`}
                  className={`${componentType}-image`}
                  src={imgUrl}
                  alt=""
                  onClick={() => {
                    handleActiveSong(song)
                  }}
                />
                <h3 className={`${componentType}-name`} onClick={() => handleRightPaneClick(song)}>{songName}</h3>
                <p className={`${componentType}-artist`}>{singerName}</p>
              </div>
            </div>
          );
        })}
      </div>
  )
}

export default DisplaySongs