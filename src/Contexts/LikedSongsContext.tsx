import React, { createContext, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../Constants";
import { Song,likedSongsContextType,ContextProviderProps } from "../Components/Types";

export const LikedSongsContext = createContext<likedSongsContextType | null>(null);

export function LikedSongsContextProvider({ children }:ContextProviderProps) : JSX.Element {

  const getItemFromLS = window.localStorage.getItem(LOCAL_STORAGE_KEY);

  const [likedSongs, setLikedSongs] = useState(
    getItemFromLS ? JSON.parse(getItemFromLS) : []
  );

  const likeSong = (song:Song) => {
    const likedSongsArr =getItemFromLS ? JSON.parse(getItemFromLS) : [];
    const newLikedSongsArr = [...likedSongsArr, song];
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(newLikedSongsArr)
    );
    // console.log("hello likeSong")
    setLikedSongs(newLikedSongsArr);
  };

  const unlikeSong = (song:Song) => {
    const likedSongsArr = getItemFromLS ? JSON.parse(getItemFromLS) : [];

    const newLikedSongsArr = likedSongsArr.filter((likedSong:Song) => {
      return likedSong.songName !== song.songName;
    });
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(newLikedSongsArr)
    );
    // console.log("hello unlikeSong")
    setLikedSongs(newLikedSongsArr);
  };

  const checkIsLiked = (content:Song) => {
    const isLiked = likedSongs.filter((song:Song) => {
      return song.id === content.id;
    });
    // console.log("hello checkSong")
    // console.log("LS:",getItemFromLS);
    return isLiked.length;
  };

  const likedSongsContextValue = {
    likedSongs,
    setLikedSongs,
    likeSong,
    unlikeSong,
    checkIsLiked,
  };

  return (
    <LikedSongsContext.Provider value={likedSongsContextValue}>
      {children}
    </LikedSongsContext.Provider>
  );
}
