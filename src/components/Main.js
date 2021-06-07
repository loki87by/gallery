/* eslint react/prop-types: 0 */
import React from 'react';
import Card from './Card';
import plus from '../images/plus.svg';
import { albums, basicAlbums } from './consts';

function Main(props) {
  const [isShowInput, setShowInput] = React.useState(false);
  const [albumName, setAlbumName] = React.useState('');

  const userAlbums = Object.keys(albums).filter(function (item) {
    return basicAlbums.indexOf(item) === -1;
  });

  const isUserAlbum = userAlbums.find((item) => {
    return item === props.currentAlbumName;
  });

  function handleAlbumSelect(event) {
    const value = event.target.value;
    if (value === 'add') {
      setShowInput(true);
    } else if (value === 'All') {
      props.setСurrentAlbumName('All');
      setShowInput(false);
    } else {
      props.setСurrentAlbumName(value);
      setShowInput(false);
    }
  }

  function handleChangeName(event) {
    setAlbumName(event.target.value);
  }

  function addAlbum() {
    albums[albumName] = [];
    props.setСurrentAlbumName(albumName);
    setShowInput(false);
    console.log(userAlbums);
  }

  function addPhoto() {
    // popup
  }

  return (
    <main className="content">
      <img src={props.background} alt="background" className="content__background" />
      <div className="content__settings">
        <div className="content__choose">
          <h2 className="content__settings-title">Choose album</h2>
          <select className="content__settings-select" onChange={handleAlbumSelect}>
            <option defaultValue>All</option>
            {Object.keys(albums).map((item, index) => (
              <option key={index} value={`${item}`}>
                {item}
              </option>
            ))}
            <option value="add">...add album...</option>
          </select>
        </div>
        {isShowInput ? (
          <>
            <form className="content__form">
              <input
                type="text"
                id="name"
                onChange={handleChangeName}
                className="content__input"
                placeholder="input name"
              ></input>
              <label htmlFor="name" className="content__label">
                input name
              </label>
              <button type="button" onClick={addAlbum} className="content__submit">
                Save
              </button>
            </form>
          </>
        ) : (
          ''
        )}
      </div>
      <div className="content__container">
        {props.currentAlbum &&
          props.currentAlbum.map((source, index) => (
            <Card
              key={index}
              num={index}
              source={source}
              currentAlbum={props.currentAlbumName}
              /* onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} */
            />
          ))}
        {isUserAlbum ? (
          <div className="card">
            <img src={plus} alt="add" onClick={addPhoto}></img>
          </div>
        ) : (
          ''
        )}
      </div>
    </main>
  );
}

export default Main;
