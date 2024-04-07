import React, { useContext, useState } from "react";
import LeftPane from "../Components/LeftPane";
import Center from "../Components/Center";
import RightPane from "../Components/RightPane";
import Footer from "../Components/Footer";
import { RightPaneContext } from "../Contexts/RightPaneContext";
import { ActiveSongContext } from "../Contexts/ActiveSongContext";
import { PlaylistsContext } from "../Contexts/PlaylistsContext";

import { ActiveSongContextType,RightPaneContextType,PlaylistsContextType } from "../Components/Types";

function Home() {
  const { footerDisplay } = useContext(ActiveSongContext) as ActiveSongContextType;
  const { rightPaneDisplay } = useContext(RightPaneContext) as RightPaneContextType;
  const {setShowPlaylistContent} = useContext(PlaylistsContext) as PlaylistsContextType;
  const [homeDisplay,setHomeDisplay] = useState(true);
  const showHome = () => {
    setHomeDisplay(true);
    setShowPlaylistContent(false)
  }
  const showSearch = () => {
    setHomeDisplay(false);
    setShowPlaylistContent(false);
  }

  return (
    <div className="main-container flex-column">
      <main className="main-component flex">
        <LeftPane rightPaneDisplay={rightPaneDisplay} showHome={showHome} showSearch={showSearch}/>
        <Center rightPaneDisplay={rightPaneDisplay} homeDisplay={homeDisplay}/>
        {rightPaneDisplay && <RightPane />}
      </main>
      {footerDisplay && <Footer />}
    </div>
  );
}

export default Home;
