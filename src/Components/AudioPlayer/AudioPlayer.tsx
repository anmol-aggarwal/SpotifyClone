import React, { useContext, useEffect, useRef, useState} from "react";
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import { ActiveSongContext } from "../../Contexts/ActiveSongContext";
import { ActiveSongContextType } from "../Types";

function AudioPlayer() {
  const {activeSong} = useContext(ActiveSongContext) as ActiveSongContextType;

  const [, setTrackIndex] = useState(activeSong ? activeSong.id : -1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTrackIndex(activeSong ? activeSong.id : -1)
  },[activeSong])

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  return (
    <div className="audio-player">
      <div className="inner flex-column justify-sa align-center">
        <DisplayTrack audioRef={audioRef} setDuration={setDuration} progressBarRef={progressBarRef}/>
        <Controls audioRef={audioRef} progressBarRef={progressBarRef} duration={duration} setTimeProgress={setTimeProgress} />
        <ProgressBar progressBarRef={progressBarRef} audioRef={audioRef} timeProgress={timeProgress} duration={duration}/>
      </div>
    </div>
  );
}

export default AudioPlayer;
