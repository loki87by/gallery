/* eslint react/prop-types: 0 */
import React from 'react';

function Popup(props) {
  function handleChangeComment(event) {
    props.setCommentText(event.target.value);
  }

  function proto() {
    return props.commentText;
  }

  function saveComment() {
    const card = props.currentPhoto;
    Object.setPrototypeOf(card, proto);
    card.prototype.comment = props.commentText;
    props.showCommentPopup(false);
    console.log(card.prototype.comment);
    props.setCommentText('');
  }

  let comment;
  if (props.currentPhoto.prototype) {
    comment = props.currentPhoto.prototype.comment;
  }

  return (
    <div className="popup">
      <div className={`popup__container ${props.isShowCardPopup && 'popup__image-container'}`}>
        <button
          className={`popup__close ${props.isShowCardPopup && 'popup__close_image'}`}
          type="reset"
          aria-label="Закрыть"
          onClick={props.closePopup}
        ></button>
        {props.isShowCommentPopup && (
          <>
            <textarea
              className="popup__text"
              onChange={handleChangeComment}
              value={props.commentText}
              placeholder="Enter your comment"
              required
            ></textarea>
            <button type="button" className="popup__button" onClick={saveComment}>
              Save
            </button>
          </>
        )}
        {props.isShowCardPopup && (
          <>
            <figure>
              <img src={props.currentImage.src} className="popup__image" alt={props.currentImage.alt} />
              <figcaption className="popup__image-title">
                {props.currentImage.alt}
                {comment && <span className="popup__text-error">{comment}</span>}
              </figcaption>
            </figure>
          </>
        )}
      </div>
    </div>
  );
}

export default Popup;
