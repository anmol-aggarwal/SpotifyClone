import * as React from 'react';
import "./App.css";
import Home from "./pages/Home";
import { RightPaneContextProvider } from "./Contexts/RightPaneContext";
import { LikedSongsContextProvider } from "./Contexts/LikedSongsContext";
import { ActiveSongContextProvider } from "./Contexts/ActiveSongContext";
import { PlaylistsContextProvider } from "./Contexts/PlaylistsContext";

const App = () => (
    <PlaylistsContextProvider>
      <ActiveSongContextProvider>
        <RightPaneContextProvider>
          <LikedSongsContextProvider>
            <Home />
          </LikedSongsContextProvider>
        </RightPaneContextProvider>
      </ActiveSongContextProvider>
    </PlaylistsContextProvider>
  );


export default App;