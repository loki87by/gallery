/* eslint react/prop-types: 0 */
import React from 'react';
import Card from './Card';
import Popup from './Popup';
import plus from '../images/plus.svg';
import { albums, basicAlbums } from '../utils/consts';

function Main(props) {
  const [isShowInput, setShowInput] = React.useState(false);
  const [isShowError, setShowError] = React.useState(false);
  const [isShowUrlInput, setShowUrlInput] = React.useState(false);
  const [isShowCommentPopup, showCommentPopup] = React.useState(false);
  const [isShowCardPopup, showCardPopup] = React.useState(false);
  const [albumName, setAlbumName] = React.useState('');
  const [photoUrl, setPhotoUrl] = React.useState('');
  const [currentPhoto, setCurrentPhoto] = React.useState({});
  const [currentImage, setCurrentImage] = React.useState('');
  const [commentText, setCommentText] = React.useState('');

  const userAlbums = Object.keys(albums).filter(function (item) {
    return basicAlbums.indexOf(item) === -1;
  });

  let isUserAlbum = userAlbums.some((item) => {
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

  function handleChangeUrl(event) {
    setPhotoUrl(event.target.value);
  }

  const urlValidation = (url) => {
    const reg = /^(ftp|http|https):\/\/[^ "]+$/;
    return reg.test(url);
  };

  function addAlbum() {
    albums[albumName] = [];
    props.setСurrentAlbumName(albumName);
    setShowInput(false);
  }

  function showAddForm() {
    setShowUrlInput(true);
  }

  function refresh() {
    props.setСurrentAlbum(albums.total);
    setTimeout(() => {
      props.setСurrentAlbum(albums[props.currentAlbumName]);
    }, 1);
  }

  function addPhoto() {
    if (urlValidation(photoUrl)) {
      setShowError(false);
      albums[props.currentAlbumName].push(photoUrl);
      setShowUrlInput(false);
    } else {
      setShowError(true);
    }
    refresh();
  }

  function handleCardDelete(ind) {
    const start = albums[props.currentAlbumName].slice(0, ind);
    const end = albums[props.currentAlbumName].slice(ind + 1);
    const newArr = [...start, ...end];
    albums[props.currentAlbumName] = newArr;
    refresh();
  }

  function closePopup() {
    showCommentPopup(false);
    showCardPopup(false);
    setCommentText('');
    setCurrentPhoto({});
    setCurrentImage('');
  }

  /* function openCardPopup(event) {
  } */

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
        ) : (
          ''
        )}
      </div>
      <div className="content__container">
        {props.currentAlbum &&
          props.currentAlbum.map((source, index) => (
            <Card
              // onCardClick={openCardPopup}
              key={index}
              num={index}
              source={source}
              currentAlbum={props.currentAlbumName}
              isUserAlbum={isUserAlbum}
              onCardDelete={handleCardDelete}
              showCommentPopup={showCommentPopup}
              currentPhoto={currentPhoto}
              setCurrentPhoto={setCurrentPhoto}
              setCommentText={setCommentText}
              setCurrentImage={setCurrentImage}
              showCardPopup={showCardPopup}
            />
          ))}
        {isUserAlbum ? (
          <div className="card">
            {isShowUrlInput ? (
              <form>
                <input
                  type="url"
                  id="url"
                  onChange={handleChangeUrl}
                  className="content__input"
                  placeholder="input image url"
                ></input>
                <label htmlFor="url" className="content__label content__label_url">
                  input image url
                </label>
                <button type="button" className="content__add-button" onClick={addPhoto}>
                  Add
                </button>
                {isShowError && <span className="content__add-error">Bad url request. Try input any url</span>}
              </form>
            ) : (
              <img src={plus} alt="add" onClick={showAddForm}></img>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
      {isShowCommentPopup && (
        <Popup
          isShowCommentPopup={isShowCommentPopup}
          closePopup={closePopup}
          currentPhoto={currentPhoto}
          showCommentPopup={showCommentPopup}
          setCommentText={setCommentText}
          commentText={commentText}
          // isShowCardPopup={isShowCardPopup}
          // showCardPopup={showCardPopup}
          // currentImage={currentImage}
          /* setCurrentPhoto={setCurrentPhoto}
          setCurrentImage={setCurrentImage} */
        />
      )}
      {isShowCardPopup && (
        <Popup
          isShowCardPopup={isShowCardPopup}
          closePopup={closePopup}
          currentPhoto={currentPhoto}
          // isShowCommentPopup={isShowCommentPopup}
          // showCommentPopup={showCommentPopup}
          // setCommentText={setCommentText}
          // commentText={commentText}
          currentImage={currentImage}
          /* setCurrentPhoto={setCurrentPhoto}
          showCardPopup={showCardPopup}
          setCurrentImage={setCurrentImage} */
        />
      )}
    </main>
  );
}

export default Main;
