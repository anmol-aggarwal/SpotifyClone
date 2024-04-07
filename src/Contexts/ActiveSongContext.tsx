import React, { createContext, useState } from "react";

import { Song ,ActiveSongContextType,ContextProviderProps} from "../Components/Types";

export const ActiveSongContext = createContext<ActiveSongContextType | null>(null);

export const ActiveSongContextProvider = ({
  children,
}: ContextProviderProps): JSX.Element => {
  const [activeSong, setActiveSong] = useState<Song>();
  const [footerDisplay, setFooterDisplay] = useState(false);
  const handleActiveSong = (song: Song) => {
    setFooterDisplay(true);
    setActiveSong(song);
  };

  const activeSongContextValue = {
    activeSong,
    setActiveSong,
    handleActiveSong,
    footerDisplay,
    setFooterDisplay,
  };
  return (
    <ActiveSongContext.Provider value={activeSongContextValue}>
      {children}
    </ActiveSongContext.Provider>
  );
};
