import React, { useContext, useState,MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faPlus,
  faMusic,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { LikedSongsContext } from "../Contexts/LikedSongsContext";
import { RightPaneContext } from "../Contexts/RightPaneContext";
import { PlaylistsContext } from "../Contexts/PlaylistsContext";
import { PlaylistsContextType, RightPaneContextType, likedSongsContextType } from "./Types";

type LeftPaneProps = {
  rightPaneDisplay: boolean;
  showHome: MouseEventHandler<HTMLDivElement>;
  showSearch:MouseEventHandler<HTMLDivElement>;
}

function LeftPane({ rightPaneDisplay, showHome, showSearch }:LeftPaneProps) {
  const noStretch = rightPaneDisplay ? "" : "flex-1";
  const { likedSongs } = useContext(LikedSongsContext) as likedSongsContextType;
  const {playlists,addPlaylist,showCreatePlaylist,setShowCreatePlaylist,displayPlaylist} = useContext(PlaylistsContext) as PlaylistsContextType
  const [playlistName,setPlaylistName] = useState('');

  const { handleRightPaneClick } = useContext(RightPaneContext) as RightPaneContextType;
  const handleChange = (e: React.ChangeEvent<any>) =>{
    setPlaylistName(e.target.value);
  }

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    addPlaylist(playlistName);
    setShowCreatePlaylist(false)
  }

  return (
    <div className={`main-left flex-column ${noStretch}`}>
      <div className="navigate flex-column justify-sb">
        <div className="home-icon flex justify-start align-center" onClick={showHome}>
          <FontAwesomeIcon icon={faHouse} className="font-awesome-icon" />
          <h3>Home</h3>
        </div>
        <div data-testid='search-button-div' className="search-icon flex justify-start align-center" onClick={showSearch}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="font-awesome-icon"
          />
          <h3>Search</h3>
        </div>
      </div>

      <div className="playlist-artists">
        <div className="create-playlist flex justify-sb align-center">
          <h2>Create New Playlist</h2>
          <div data-testid='create-playlist-button' onClick={() => setShowCreatePlaylist(true)}>
            <FontAwesomeIcon icon={faPlus} size="2x" className="font-awesome-icon add-playlist-plus-icon" />
          </div>
        </div>

        {showCreatePlaylist ? (<form className="create-playlist-form flex justify-sb align-center" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Enter Playlist Name:</label>
            {/* <div > */}
              <input data-testid="create-playlist-inputbox" required type="text" className="create-playlist-input" onChange={(e) => handleChange(e)}/>
            {/* </div> */}
          </div>
          <button type="submit" className="create-playlist-submit-btn">
            <FontAwesomeIcon icon={faCheck} size="2x" className="font-awesome-icon create-playlist-submit" onClick={() => setShowCreatePlaylist(true)} />
          </button>
        </form>) : ''}

        <div className="playlist flex-column">
            {playlists.map(playlist => {
              return (<div key={playlist.id} className="playlist-item flex justify-sb align-center" onClick={() => displayPlaylist(playlist)}>
                <FontAwesomeIcon size="2x" icon={faMusic} className="font-awesome-icon playlist-music-icon" />
                <h2>
                 {playlist.name}
                </h2>
              </div>)
            })}
        </div>

        <div className="artists flex-column">
          <h1>Artists</h1>
          <div className="artist a-1">
            <img
              src="https://i.scdn.co/image/ab6761610000101ffc043bea91ac91c222d235c9"
              alt="Diljit Dosanjh"
            />
            <div className="artist-info flex-column">
              <h3>Diljit Dosanjh</h3>
              <p>Artist</p>
            </div>
          </div>

          <div className="artist a-2">
            <img
              src="https://i.scdn.co/image/ab6761610000101fb09a31f853166e721d4d46b2"
              alt="KK"
            />
            <div className="artist-info flex-column">
              <h3>KK</h3>
              <p>Artist</p>
            </div>
          </div>

          <div className="artist a-3">
            <img
              src="https://i.scdn.co/image/ab6761610000101f0261696c5df3be99da6ed3f3"
              alt="Arijit Singh"
            />
            <div className="artist-info flex-column">
              <h3>Arijit Singh</h3>
              <p>Artist</p>
            </div>
          </div>
        </div>

        <h1 className="liked-songs-h1">Liked Songs</h1>
        <div className="liked-songs-container flex-column">
          {likedSongs.map(likedSong => {
            return (
              <div
                key={likedSong.id}
                className="liked-song-info flex align-center justify-sb"
                onClick={() => handleRightPaneClick(likedSong)}
              >
                <p className="liked-song-name" data-testid='liked-song-item'>{likedSong?.songName}</p>
                <p className="liked-song-singer">{likedSong?.singerName}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LeftPane;
