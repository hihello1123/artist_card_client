import React, { useEffect, useState } from 'react';
import { BackspaceIcon, PlayIcon } from '@heroicons/react/solid';
import ReactPlayer from 'react-audio-player';
import axios from 'axios';
function Album({ clicked, clearFunc }) {
  const [songList, setSongList] = useState([]);
  console.log(process.env.REACT_APP_API_URL);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/${clicked.id}`)
      .then((res) => {
        setSongList(res.data);
      })
      .catch((err) => {
        if (err) throw err;
      });
  }, [clicked.id]);

  console.log(clicked);
  const [songPlaying, setPlaying] = useState('');

  const SongList = () => {
    let Songs = [];
    for (let n = 0; n < songList.length; n++) {
      Songs.push(
        <div className="songContainer" key={`song${n}`}>
          <div className="songTitle">{songList[n].songtitle}</div>
          <PlayIcon
            className="playIcon"
            onClick={() => setPlaying(songList[n].songtitle)}
          />
        </div>
      );
    }
    return Songs;
  };

  console.log(songPlaying);
  console.log(process.env.PUBLIC_URL + '/Music/' + songPlaying + '.mp3');

  return (
    <div className="clickedAlbum">
      <div className="clickedAlbum_top">
        <img src={clicked.picture} className="clickedImg" alt="" />
        <div className="clickedAlbum_title">{clicked.title}</div>
        <div className="clickedAlbum_singer">{clicked.singer}</div>
        <div className="clickedAlbum_container">
          <div className="clickedAlbum_genre">{clicked.genre}</div>
          <div className="clickedAlbum_company">{clicked.company}</div>
          <div className="clickedAlbum_published">{clicked.published}</div>
        </div>
      </div>
      {SongList()}
      {songPlaying ? (
        <div className="player">
          <ReactPlayer
            src={process.env.PUBLIC_URL + '/Music/' + songPlaying + '.mp3'}
            autoPlay
            controls
          />
        </div>
      ) : (
        <></>
      )}
      <BackspaceIcon className="backIcon" onClick={clearFunc} />
    </div>
  );
}

export default Album;
