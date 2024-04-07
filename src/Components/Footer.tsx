import React, { useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faHeart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import {faHeart as faEmptyHeart} from '@fortawesome/free-regular-svg-icons';

import { ActiveSongContext } from "../Contexts/ActiveSongContext";
import { LikedSongsContext } from "../Contexts/LikedSongsContext";

import AudioPlayer from "./AudioPlayer/AudioPlayer";

import { ActiveSongContextType,likedSongsContextType } from "../Components/Types";

function Footer() {
  const {activeSong, setFooterDisplay} = useContext(ActiveSongContext) as ActiveSongContextType;
  const {likeSong,checkIsLiked,unlikeSong} = useContext(LikedSongsContext) as likedSongsContextType;

  if(!activeSong) return null;

  const {songName,singerName,imgUrl} = activeSong;

  const isCurrSongLiked = checkIsLiked(activeSong);

  return (
    <footer>
      {/* <!-- left --> */}
      <div className="footer-left flex justify-start align-center">
        <div className="right-pane-toggle">
          <div title="collapse" className="collapse-icon-wrapper">
            <FontAwesomeIcon icon={faAngleDown} className="collapse-icon font-awesome-icon" />
          </div>
          <div title="expand" className="expand-icon-wrapper">
            <FontAwesomeIcon icon={faAngleUp} className="expand-icon font-awesome-icon" />
          </div>
          <img
            data-testid='footer-song-image'
            className="footer-left-img"
            src={imgUrl}
            alt={songName}
          />
        </div>
        <div className="song-info">
          <div className="song-name">
            {songName}
          </div>
          <div className="singer-name">{singerName}</div>
        </div>
        {isCurrSongLiked ? (
          <FontAwesomeIcon
            icon={faHeart}
            size="2x"
            className="font-awesome-icon"
            onClick={() => unlikeSong(activeSong)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEmptyHeart}
            size="2x"
            className="font-awesome-icon"
            onClick={() => likeSong(activeSong)}
          />
        )}
      </div>

      {/* <!-- center --> */}
      <div className="footer-center">
        <AudioPlayer/>
      </div>

      {/* <!-- right --> */}
      <div className="footer-right flex align-center justify-end">
        <FontAwesomeIcon className="footer-close-button font-awesome-icon" onClick={() => setFooterDisplay(false)} icon={faXmark} size="2x"/>
      </div>
    </footer>
  );
}

export default Footer;
