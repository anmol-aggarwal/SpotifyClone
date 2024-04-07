import React, { useContext } from 'react'
import { PlaylistsContext } from '../../Contexts/PlaylistsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic,faClock } from '@fortawesome/free-solid-svg-icons';
import { songs } from '../../resources/songs';
import { ActiveSongContext } from '../../Contexts/ActiveSongContext';
import { ActiveSongContextType, PlaylistsContextType, Song } from '../Types';

function PlaylistContent() {
  const {playlistDisplayData} = useContext(PlaylistsContext) as PlaylistsContextType;
  const {handleActiveSong} = useContext(ActiveSongContext) as ActiveSongContextType;
  if(!playlistDisplayData)  return;
  
  return (
    <div className='display-playlist-data-container'>
      <div className="display-playlist-header flex align-center">
        <div className="display-playlist-music-img flex align-center justify-center">
          <FontAwesomeIcon size="6x" icon={faMusic} className="font-awesome-icon display-playlist-music-icon" />
        </div>
        <div className='flex-column display-playlist-header-info'>
          <p>Playlist</p>
          <h1>{playlistDisplayData.name}</h1>
        </div>
      </div>
      <div className='display-playlist-line'/>
      <div className="display-playlist-content">
        <div className='display-playlist-content-titles flex align-center justify-center'>
          <span className='display-playlist-content-title-1'>#</span>
          <p className='display-playlist-content-title-2'>Song Name</p>
          <p className='display-playlist-content-title-3'>Artist</p>
          <FontAwesomeIcon icon={faClock} className='display-playlist-content-title-4'/>
        </div>
        {playlistDisplayData.playlistSongs.map((playlistSong:Song,index:number) => {
          return(
            <div key={playlistSong.id} className='display-playlist-content-values flex align-center justify-center' onClick={() => {
              handleActiveSong(playlistSong)
            }}>
              <span className='display-playlist-content-value-1'>{index+1}</span>
              <div className="display-playlist-content-value-2 display-playlist-content-song-info flex align-center">
                <img src={playlistSong.imgUrl} alt="" />
                  <p>{playlistSong.songName}</p>
              </div>
              <p className='display-playlist-content-value-3'>{playlistSong.singerName}</p>
              <p className='display-playlist-content-value-4'>{songs[playlistSong.id].duration}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlaylistContent