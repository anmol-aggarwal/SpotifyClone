import React, { useContext ,RefObject } from 'react'
import { ActiveSongContext } from '../../Contexts/ActiveSongContext';
import { ActiveSongContextType } from '../Types';

type DisplayTrackProps = {
  audioRef?: RefObject<HTMLAudioElement>;
  setDuration: (val:number) => void;
  progressBarRef?: RefObject<HTMLInputElement>;
}

function DisplayTrack({audioRef , setDuration , progressBarRef}:DisplayTrackProps) {
  const {activeSong} = useContext(ActiveSongContext) as ActiveSongContextType;
  if(!activeSong) return null;
  const handleLoadedMetadata = () =>{
    if(audioRef && progressBarRef?.current && audioRef.current){
      const seconds = audioRef.current.duration;
      setDuration(seconds);
      progressBarRef.current.max = seconds.toString();
    }
  }

  return (
    <div>
      <audio src={activeSong.audioSrc} onLoadedMetadata={handleLoadedMetadata} ref={audioRef} />
    </div>
  )
}

export default DisplayTrack