import React, { createContext, useState } from "react";
import { PLAYLISTS_KEY } from "../Constants";
import { Song,Playlist,PlaylistsContextType,ContextProviderProps } from "../Components/Types";

export const PlaylistsContext = createContext<PlaylistsContextType | null>(null);

export const PlaylistsContextProvider = ({
  children,
}: ContextProviderProps): JSX.Element => {

  const getItemFromLS = window.localStorage.getItem(PLAYLISTS_KEY);
  const [playlists, setPlaylists] = useState(getItemFromLS ? JSON.parse(getItemFromLS) : []);

  const addPlaylist = (playlistName: string): void => {
    const newPlaylist: Playlist = {
      id: playlists.length + 1,
      name: playlistName,
      playlistSongs: [],
    };

    let playlistsArr: Playlist[];
    const getItem = window.localStorage.getItem(PLAYLISTS_KEY);
    if (getItem !== null) {
      playlistsArr = JSON.parse(getItem);
    } else {
      playlistsArr = [];
    }
    const newPlaylistArr = [...playlistsArr, newPlaylist];
    window.localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(newPlaylistArr));
    setPlaylists([...playlists, newPlaylist]);
  };

  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);

  function addSongToPlaylist(playlistName: string, song: Song) {
    const getItemFromLS = window.localStorage.getItem(PLAYLISTS_KEY);
    const playlistsArr = getItemFromLS ? JSON.parse(getItemFromLS) : [];
    let reqId: number;
    let prevSongs: Song[];

    const newPlaylistArr = playlistsArr.map((playlist: Playlist): Playlist => {
      if (playlist.name === playlistName) {
        reqId = playlist.id;
        prevSongs = playlist.playlistSongs;

        const doesSongExist = prevSongs.filter((prevSong) => {
          return prevSong.id === song.id;
        });
        let updatedPlaylist: Playlist;

        if (doesSongExist.length === 0) {
          updatedPlaylist = {
            id: reqId,
            name: playlistName,
            playlistSongs: [...prevSongs, song],
          };
          return updatedPlaylist;
        }
      }
      return playlist;
    });

    setPlaylists(newPlaylistArr);
    window.localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(newPlaylistArr));
    setShowAddToPlaylist(false);
  }

  const [playlistDisplayData, setPlaylistDisplayData] = useState<Playlist | null>(null);
  const [showPlaylistContent, setShowPlaylistContent] = useState(false);

  const displayPlaylist = (playlist:Playlist) => {
    setPlaylistDisplayData(playlist);
    setShowPlaylistContent(true);
  }
  const playlistsContextValue = {
    playlists,
    setPlaylists,
    addPlaylist,
    showCreatePlaylist,
    setShowCreatePlaylist,
    showAddToPlaylist,
    setShowAddToPlaylist,
    addSongToPlaylist,
    playlistDisplayData,
    setPlaylistDisplayData,
    showPlaylistContent,
    setShowPlaylistContent,
    displayPlaylist,
  };
  return (
    <PlaylistsContext.Provider value ={playlistsContextValue}>
      {children}
    </PlaylistsContext.Provider>
  );
};
