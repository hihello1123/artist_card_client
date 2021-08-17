import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';
import axios from 'axios';

import Album from './Album';

dotenv.config();

function Base() {
  const [albumList, setList] = useState([]);
  useEffect(() => {
    axios
      .get('http://ec2-3-36-63-88.ap-northeast-2.compute.amazonaws.com')
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [clicked, setClicked] = useState({
    title: '',
    singer: '',
    picture: '',
    id: '',
  });

  const AlbumList = () => {
    let List = [];
    for (let n = 0; n < albumList.length; n++) {
      List.push(
        <div
          className="albumContainer"
          key={n}
          onClick={() => {
            setClicked({ ...clicked, ...albumList[n] });
          }}
        >
          <div className="albumImg">
            <img src={process.env.PUBLIC_URL + albumList[n].picture} alt="" />
          </div>
          <div className="albumTitle">
            <div className="albumTitle_title">{albumList[n].title}</div>
            <div className="albumTitle_singer">{albumList[n].singer}</div>
          </div>
        </div>
      );
    }
    return List;
  };

  const clearFunc = () => {
    setClicked({
      title: '',
      singer: '',
      picture: '',
    });
  };

  return (
    <div className="base">
      <div className="baseTop">Artists`Card</div>
      <div className="baseLine" />
      <div className="baseSong">{AlbumList()}</div>
      {clicked.title ? (
        <Album clicked={clicked} clearFunc={clearFunc} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Base;
