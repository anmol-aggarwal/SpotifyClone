import React from "react";
import { songs } from "../../resources/songs";
import DisplaySongs from "./DisplaySongs";
import YourPlaylists from "./YourPlaylists";

function TrendingSongs() {

  return (
    <div>
      <YourPlaylists/>
      <div className="trending-songs-wrapper">
        <h1 className="trending-songs-heading">Trending Songs</h1>
        <DisplaySongs songs={songs} componentType={'trending-song'} />
      </div>
    </div>
  );
}

export default TrendingSongs;
