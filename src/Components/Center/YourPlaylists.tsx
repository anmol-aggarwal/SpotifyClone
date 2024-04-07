import React, { useContext } from 'react'
import { PlaylistsContext } from '../../Contexts/PlaylistsContext'
import { PlaylistsContextType } from '../Types';

function YourPlaylists() {
  const {playlists,setShowCreatePlaylist,displayPlaylist} = useContext(PlaylistsContext) as PlaylistsContextType;
  const defaultImgUrl = 'https://developer.spotify.com/images/guidelines/design/icon3@2x.png';

  return (
    <div>
      <h1 className="your-playlists-heading">Your Playlists</h1>
      {playlists.length ? (<div className="your-playlists-container">
        {playlists.map(playlist => {
          return(
            <div key={playlist.id} className='flex-column align-center justify-se your-playlist-card' onClick={() => displayPlaylist(playlist)}>
              <img className='your-playlist-image' src={playlist.playlistSongs.length ? playlist.playlistSongs[playlist.playlistSongs.length-1].imgUrl : defaultImgUrl} alt="" />
              <h2>{playlist.name}</h2>
            </div>
          )
        })}
      </div>) : (
      <div>
        <button className='create-playlist-button' onClick={() => setShowCreatePlaylist(true)}>
          <h1>Create new Playlist</h1>
        </button>
      </div>
      )}
    </div>
  )
}

export default YourPlaylists