import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./pages/Home";
import App from "./App";
import Senorita from "./resources/Audios/Senorita.mp3";

import { LikedSongsContextProvider } from "./Contexts/LikedSongsContext";
import { PlaylistsContextProvider } from "./Contexts/PlaylistsContext";
import { ActiveSongContextProvider } from "./Contexts/ActiveSongContext";
import { RightPaneContextProvider } from "./Contexts/RightPaneContext";

function storageMock() {
  let storage = {
    likedSongs: [
      {
        id: 3,
        songName: "Senorita",
        singerName: "Shawn Mendes",
        songLyrics: "I love it when you call me senorita...",
        composerName: "Shawn Mendes, Camila Cabello",
        lyricistName: "Shawn Mendes, Camila Cabello",
        imgUrl:
          "https://i.scdn.co/image/ab67616d0000b273bbda2325afa7cfda80ccd856",
        audioSrc: Senorita,
        duration: "3:10",
      },
    ],
  };

  return {
    setItem: function (key, value) {
      storage[key].push(value || "");
    },
    getItem: function (key) {
      return key in storage ? storage[key] : null;
    },
    removeItem: function (key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function (i) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
  };
}

window.localStorage = storageMock();

test("Clicking on song name opens RightPane", () => {
  render(<App />);

  const songName = screen.getByText(/we are!/i);
  fireEvent.click(songName);

  const credits = screen.getByText(/credits/i);

  expect(credits).toBeInTheDocument();
});

test("Clicking on song-card image opens footer", () => {
  render(<App />);

  const songName = screen.getByTestId("center-song-image-Senorita");
  fireEvent.click(songName);

  const img = screen.getByTestId("footer-song-image");

  expect(img).toBeInTheDocument();
});

test("Clicking on search opens Searchbar", () => {
  render(<App />);

  const songName = screen.getByTestId("search-button-div");
  fireEvent.click(songName);

  const inputBox = screen.getByRole("textbox");

  expect(inputBox).toBeInTheDocument();
});

  test("Clicking on Plus button opens create playlist modal", () => {
    render(<App />);

    const plusButton = screen.getByTestId('create-playlist-button');
    fireEvent.click(plusButton);

    // const inputBox = screen.getByRole('textbox')
    const inputBox = screen.getByTestId('create-playlist-inputbox');

    expect(inputBox).toBeInTheDocument()
  });

test("Clicking on Add to Playlist opens Playlist select menu", () => {
    render(<App />);
  
    const songName = screen.getByText(/we are!/i);
    fireEvent.click(songName);

    const addToPlaylistBtn = screen.getByTestId('add-to-playlist-btn');
    fireEvent.click(addToPlaylistBtn);

    const selectMenu = screen.queryByTestId('Playlist-select-menu');
    expect(selectMenu).toBeInTheDocument();
  });

// Object.defineProperty(window, "localStorage", { value: storageMock });
test("Liking a song adds that song to Liked Songs", () => {
  render(<App />);

  const songName = screen.getByText(/we are!/i);
  fireEvent.click(songName);

  const likeDiv = screen.getByTestId("like-div");
  fireEvent.click(likeDiv);

  const likedSongs = screen.queryAllByTestId("liked-song-item");

  console.log(likedSongs.length);

  expect(likedSongs[0].textContent).toBe("We Are!");

  const unlikeDiv = screen.getByTestId("unlike-div");
  expect(unlikeDiv).toBeInTheDocument();
  // expect(likedSongs[likedSongs.length-1]).toBe('We Are!')
});
