import React, { forwardRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { songs } from "../../resources/songs";
import DisplaySongs from "./DisplaySongs";

const SearchSongs = forwardRef<HTMLInputElement>(({} , ref) => {
  const [searchSongsArr, setSearchSongsArr] = useState(songs);
  const handleChange = (e: React.ChangeEvent<any>) => {
    const newSearchSongsArr = songs.filter((song) => song.songName.toLowerCase().includes(e.target.value.toLowerCase()))
    setSearchSongsArr(newSearchSongsArr);
  };

  return (
    <div className="search-result-wrapper">
      <div className="input-button-container flex justify-start">
        <input
          type="text"
          className="search-input"
          placeholder="Search for songs"
          onChange={(e) => handleChange(e)}
          ref={ref}
        />
        <FontAwesomeIcon
          className="input-search-icon font-awesome-icon"
          icon={faMagnifyingGlass}
          size="2x"
        />
      </div>
      <DisplaySongs songs={searchSongsArr} componentType={"search-result"} />
    </div>
  );
})
export default SearchSongs;
