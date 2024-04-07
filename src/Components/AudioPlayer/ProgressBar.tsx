import React, { MutableRefObject,RefObject } from 'react'

type ProgressBarProps = {
  progressBarRef:RefObject<HTMLInputElement>;
  audioRef:RefObject<HTMLAudioElement>;
  timeProgress: number;
  duration:number;
}

const ProgressBar = ({progressBarRef,audioRef,timeProgress,duration}:ProgressBarProps) => {
  const handleChange = () => {
    if(progressBarRef.current && audioRef.current)
    audioRef.current.currentTime = Number(progressBarRef.current.value);
  }

  const formatTime = (time:number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes =
        minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds =
        seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };

  return (
    <div className="progress">
      <span className="time current">{formatTime(timeProgress)}</span>
      <input className='progress-slider' type="range" ref={progressBarRef} onChange={handleChange}/>
      <span className="time">{formatTime(duration)}</span>
    </div>
  )
}

export default ProgressBar