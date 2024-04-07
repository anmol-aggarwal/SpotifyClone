import React, { forwardRef , useRef , useEffect, useContext} from 'react'
import TrendingSongs from './Center/TrendingSongs'
import SearchSongs from './Center/SearchSongs';
import { PlaylistsContext } from '../Contexts/PlaylistsContext';
import PlaylistContent from './Center/PlaylistContent';
import {PlaylistsContextType } from "../Components/Types";

type CenterComponentProps = {
  rightPaneDisplay:boolean;
  homeDisplay:boolean;
}
const Center = forwardRef( ({rightPaneDisplay,homeDisplay}:CenterComponentProps ,ref) => {
  const stretchCenter = rightPaneDisplay ? 'main-center-flex-2' : 'main-center-flex-3';
  const {showCreatePlaylist,showAddToPlaylist,showPlaylistContent} = useContext(PlaylistsContext) as PlaylistsContextType;
  const overlay=(showCreatePlaylist || showAddToPlaylist) ? 'overlay-center' : '';

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(()=> {
    inputRef.current?.focus();
  },[homeDisplay])

  
  return (
    <div className={`${stretchCenter}`}>
      <div className={`${overlay}`}>
      </div>
      {showPlaylistContent ? <PlaylistContent/> : (homeDisplay ? <TrendingSongs/> : <SearchSongs ref={inputRef}/>)}
      </div>
  )
})

export default Center