/* eslint react/prop-types: 0 */
import React from 'react';
import paper from '../images/paper.svg';
import '../blocks/card/card.css';

function Card(props) {
  function handleClick(event) {
    // props.onCardClick(event);
    props.setCurrentImage(event.target);
    props.setCurrentPhoto(event.target.offsetParent);
    props.showCardPopup(true);
  }

  function handleLikeClick(event) {
    event.target.classList.toggle('card__like_type_active');
  }
  function handleDeleteClick() {
    props.onCardDelete(props.num);
  }

  function openComments(event) {
    props.setCurrentPhoto(event.target.offsetParent);
    const card = props.currentPhoto;
    if (card.prototype) {
      const comment = card.prototype.comment;
      props.setCommentText(comment);
    }
    props.showCommentPopup(true);
  }

  return (
    <template id="card" className="card">
      {props.isUserAlbum ? (
        <button className="card__delete" onClick={handleDeleteClick} type="reset" aria-label="Удалить"></button>
      ) : (
        ''
      )}
      <img
        className="card__image"
        onClick={handleClick}
        src={props.source}
        alt={`${props.currentAlbum}-${props.num}`}
      />
      <div className="card__bottom">
        <h2 className="card__title">{`${props.currentAlbum}-${props.num + 1}`}</h2>
        <img alt="comment" src={paper} className="card__add-comment" onClick={openComments} />
        <button className="card__like" onClick={handleLikeClick} type="button" aria-label="Мне нравится"></button>
      </div>
    </template>
  );
}

export default Card;
