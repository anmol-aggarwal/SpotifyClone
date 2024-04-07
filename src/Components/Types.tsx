export type Song = {
    id: number;
    songName: string;
    singerName: string;
    songLyrics: string;
    composerName: string;
    lyricistName: string;
    imgUrl: string;
    audioSrc: any;
    duration: string;
  };

  export type Playlist = {
    id: number;
    name: string;
    playlistSongs: Song[];
  };
  
  export type ActiveSongContextType = {
    activeSong?: Song;
    setActiveSong : (song:Song) => void;
    handleActiveSong: (song:Song) => void;
    footerDisplay:boolean;
    setFooterDisplay: (val:boolean) => void;
  }

  export type RightPaneContextType = {
    rightPaneContent?: Song;
    setRightPaneContent: (song:Song) => void;
    rightPaneDisplay: boolean;
    setRightPaneDisplay: (val:boolean) => void;
    handleRightPaneClick: (song:Song) => void;
  }

  export type PlaylistsContextType = {
    playlists:Playlist[];
    setPlaylists: (playlist:Playlist) => void;
    addPlaylist:(playlistName: string) => void;
    showCreatePlaylist: boolean;
    setShowCreatePlaylist: (val:boolean) => void;
    showAddToPlaylist: boolean;
    setShowAddToPlaylist: (val:boolean) => void;
    addSongToPlaylist: (playlistName: string, song: Song) => void;
    playlistDisplayData: Playlist | null;
    setPlaylistDisplayData: (playlist:Playlist) => void;
    showPlaylistContent: boolean;
    setShowPlaylistContent: (val:boolean) => void;
    displayPlaylist:(playlist:Playlist) => void;
  }

  export type likedSongsContextType = {
    likedSongs:Song[];
    setLikedSongs: (song:Song) => void;
    likeSong: (song:Song) => void;
    unlikeSong: (song:Song) => void;
    checkIsLiked: (song:Song) => number;
  };

  export type ContextProviderProps = {
    children : JSX.Element
  }