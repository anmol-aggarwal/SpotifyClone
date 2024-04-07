import React, { useEffect, useState, useRef, useCallback, useContext,RefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faBackward,
  faCirclePlay,
  faCirclePause,
  faForward,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { ActiveSongContext } from "../../Contexts/ActiveSongContext";

import { songs } from "../../resources/songs";
import { ActiveSongContextType } from "../Types";

type ControlProps = {
  audioRef:RefObject<HTMLAudioElement>;
  progressBarRef:RefObject<HTMLInputElement>;
  duration:number;
  setTimeProgress: (val:number) => void;
}

function Controls({ audioRef, progressBarRef, duration, setTimeProgress} : ControlProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if(audioRef.current)  isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying, audioRef]);

  const {activeSong,setActiveSong} = useContext(ActiveSongContext) as ActiveSongContextType;

  const trackIndex = activeSong ? activeSong.id : -1;

  const toggleTrack = () => setIsPlaying(!isPlaying);

  const playAnimationRef = useRef<number>();

  const repeat = useCallback(() => {
    if(audioRef.current === null) return;
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    if(progressBarRef.current){
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(Number(progressBarRef.current.value) / duration) * 100}%`
      );
}
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if(audioRef.current)  isPlaying ? audioRef.current.play() : audioRef.current.pause();
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const skipForward = () => {
    if(audioRef.current)  audioRef.current.currentTime += 15;
  };
  
  const skipBackward = () => {
    if(audioRef.current)  audioRef.current.currentTime -= 15;
  };
  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = songs.length - 1;
      setActiveSong(songs[lastTrackIndex])
    } else {
      setActiveSong(songs[trackIndex-1]);
    }
  };

  const handleNext = () => {
    if (trackIndex >= songs.length - 1) {
      setActiveSong(songs[0])
    } else {
      setActiveSong(songs[trackIndex+1])
    }
  };

  return (
    <div>
      <div className="music-icons flex justify-center">
        <FontAwesomeIcon
          icon={faBackwardStep}
          size="2x"
          className="font-awesome-icon controls-icon"
          onClick={handlePrevious}
        />
        <FontAwesomeIcon
          icon={faBackward}
          size="2x"
          className="font-awesome-icon controls-icon"
          onClick={skipBackward}
        />
        {isPlaying ? (
          <FontAwesomeIcon
            icon={faCirclePause}
            size="2x"
            className="font-awesome-icon controls-icon"
            onClick={toggleTrack}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCirclePlay}
            size="2x"
            className="font-awesome-icon controls-icon"
            onClick={toggleTrack}
          />
        )}
        <FontAwesomeIcon
          icon={faForward}
          size="2x"
          className="font-awesome-icon controls-icon"
          onClick={skipForward}
        />
        <FontAwesomeIcon
          icon={faForwardStep}
          size="2x"
          className="font-awesome-icon controls-icon"
          onClick={handleNext}
        />
      </div>
    </div>
  );
}

export default Controls;
