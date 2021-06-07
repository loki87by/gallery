/* eslint react/prop-types: 0 */
import React from 'react';
import '../blocks/card/card.css';

function Card(props) {
  /* function handleClick() {
    props.onCardClick(props.card)
  } */

  function handleLikeClick(event) {
    event.target.classList.toggle('card__like_type_active');
  }
  function handleDeleteClick() {
    props.onCardDelete(props.num);
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
        /* onClick={handleClick} */ src={props.source}
        alt={`${props.currentAlbum}-${props.num}`}
      />
      <div className="card__bottom">
        <h2 className="card__title">{`${props.currentAlbum}-${props.num + 1}`}</h2>
        <button className="card__like" onClick={handleLikeClick} type="button" aria-label="Мне нравится"></button>
      </div>
    </template>
  );
}

export default Card;
