import React, { useState } from "react";
import moment from "moment";
import { Trash2 } from "react-feather";
import './ListCard.css';
import Modal from '../page/boardList/BoardListModal'; // 모달 컴포넌트를 import 합니다.

const ListCard = ({ card, step, handleDeleteCard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createdDate = card.created ? moment(card.created).format("YYYY년 MM월 DD일 HH시 MM분") : "";

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="list-card" onClick={handleOpenModal}>
        <div className="list-card-header">
          <h1 className="list-card-title">{card.title}</h1>
          <button className="delete-card-button" onClick={(e) => { e.stopPropagation(); handleDeleteCard(card.id); }}>
            <Trash2 size={16} />
          </button>
        </div>
        <div className="list-card-footer">
          <span className="list-card-date">{createdDate}</span>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="modal-content">
            <h1>{card.title}</h1>
            <p>생성 일자: {createdDate}</p>
            <h2>Comments</h2>
            <textarea placeholder="Add a comment..." rows="4" className="comment-box"></textarea>
            <button className="add-comment-button">Add Comment</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ListCard;


/* <h1>{card.title}</h1>
        <Labels type={step} dateDiff={dateDiff}>
        <Clock />
        {deadline}
      </Labels> */