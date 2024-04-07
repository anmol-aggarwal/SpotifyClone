import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { RightPaneContext } from "../Contexts/RightPaneContext";
import { LikedSongsContext } from "../Contexts/LikedSongsContext";
import { faHeart as faEmptyHeart } from "@fortawesome/free-regular-svg-icons";
import {faSortDown} from "@fortawesome/free-solid-svg-icons";
import { PlaylistsContext } from "../Contexts/PlaylistsContext";
import { RightPaneContextType,PlaylistsContextType,likedSongsContextType } from "../Components/Types";

function RightPane() {
  const { rightPaneContent, setRightPaneDisplay } = useContext(RightPaneContext) as RightPaneContextType;

  const { likeSong, unlikeSong, checkIsLiked } = useContext(LikedSongsContext) as likedSongsContextType;
  const {playlists,setShowAddToPlaylist,showAddToPlaylist,addSongToPlaylist} = useContext(PlaylistsContext) as PlaylistsContextType;
  
  if(!rightPaneContent) return null;
  
  const { songName, singerName, composerName, lyricistName, imgUrl } = rightPaneContent
  const isCurrSongLiked = checkIsLiked(rightPaneContent);

  const handleChange = (e : React.ChangeEvent<any>) => {
    addSongToPlaylist(e.target.value,rightPaneContent)
  }

  return (
    <div className="main-right">
      <div className="right-pane-top flex align-center justify-sb">
        <h2>{songName}</h2>
        <FontAwesomeIcon
          onClick={() => setRightPaneDisplay(false)}
          className="right-pane-close-button font-awesome-icon"
          icon={faXmark}
          size="2x"
        />
      </div>
      <img className="right-pane-image" src={imgUrl} alt="" />
      <div className="right-pane-center flex align-center justify-sb">
        <h1>{songName}</h1>
        <div>  
          {isCurrSongLiked ? (
            <div data-testid="unlike-div" onClick={() => unlikeSong(rightPaneContent)}>
              <FontAwesomeIcon
                icon={faHeart}
                size="2x"
                className="font-awesome-icon"
              />
            </div>
          ) : (
            <div data-testid="like-div" onClick={() => likeSong(rightPaneContent)}>
              <FontAwesomeIcon
                icon={faEmptyHeart}
                size="2x"
                className="font-awesome-icon"
              />
            </div>
          )}
        </div>
      </div>
      <div className="right-pane-bottom flex-column">
        <h1>Credits</h1>
        <div>
          <h3 className="right-pane-singer-name">{singerName}</h3>
          <p>Main Artist</p>
        </div>
        <div>
          <h3 className="right-pane-composer-name">{composerName}</h3>
          <p>Composer, Producer</p>
        </div>
        <div>
          <h3 className="right-pane-lyricist-name">{lyricistName}</h3>
          <p>Lyricist</p>
        </div>
      </div>
      <div>
        <button data-testid='add-to-playlist-btn' className="add-to-playlist-button" onClick={() => setShowAddToPlaylist(true)}>
          <h2>Add to Playlist</h2>
        </button>
      </div>

      {showAddToPlaylist && <div className="add-to-playlist" data-testid='Playlist-select-menu'>
      <h1>Select Playlist</h1>
      <div className="select-container flex justify-sb align-center">
        <select className="select-box choose-add-to-playlist" onChange={(e) => handleChange(e)}>
          <option>--Select--</option>
          {playlists.map(playlist => {
                return (<option key={playlist.id} value={playlist.name}>{playlist.name}</option>)
              })}
        </select>
        <FontAwesomeIcon icon={faSortDown} className="font-awesome-icon choose-playlist-down-icon" />
      </div>
      </div>}
    </div>

  );
}

export default RightPane;
