import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import { Trash2, Calendar } from "react-feather";
import './ListCard.css';
import Modal from '../page/boardList/BoardListModal';
import Comment from '../page/comment/Comment';
import CommentModule from '../page/comment/CommentModule';

const ListCard = ({ card, step, handleDeleteCard }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const createdDate = card.created ? moment(card.created).format("YYYY년 MM월 DD일") : "";
    const commentModuleRef = useRef(null);

    useEffect(() => {
        const fetchComments = async () => {
            if (commentModuleRef.current) {
                try {
                    const cardComments = await commentModuleRef.current.getCommentsByCardId(card.id);
                    setComments(cardComments);
                } catch (error) {
                    console.error('Error fetching comments:', error);
                }
            }
        };

        if (isModalOpen) {
            fetchComments();
        }
    }, [isModalOpen, card.id]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateComment = async (cardId, newComment) => {
        console.log("Before sending to backend:", newComment);
        if (commentModuleRef.current) {
            console.log("Sending comment data to backend:", newComment);
            await commentModuleRef.current.createComment(cardId, newComment);
            const cardComments = await commentModuleRef.current.getCommentsByCardId(cardId);
            setComments(cardComments);
        }
    };

    const handleUpdateComment = async (commentId, updatedComment) => {
        console.log("Before updating to backend:", updatedComment);
        if (commentModuleRef.current) {
            console.log("Updating comment data to backend:", updatedComment);
            await commentModuleRef.current.updateComment(commentId, updatedComment);
            const cardComments = await commentModuleRef.current.getCommentsByCardId(card.id);
            setComments(cardComments);
        }
    };

    const handleDeleteComment = async (commentId) => {
        console.log("Deleting comment with ID:", commentId);
        if (commentModuleRef.current) {
            await commentModuleRef.current.deleteComment(commentId);
            const cardComments = await commentModuleRef.current.getCommentsByCardId(card.id);
            setComments(cardComments);
        }
    };

    return (
        <>
            <div className="list-card" onClick={handleOpenModal}>
                <div className="list-card-label">low priority</div> {/* You can dynamically set the label text */}
                <div className="list-card-title">{card.title}</div>
                <div className="list-card-footer">
                    <Calendar size={16} />
                    <span className="list-card-date">{createdDate}</span>
                </div>
                <button className="delete-card-button" onClick={(e) => { e.stopPropagation(); handleDeleteCard(card.id); }}>
                    <Trash2 size={16} />
                </button>
            </div>

            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <div className="modal-content">
                        <h1>{card.title}</h1>
                        <p>Created: {createdDate}</p>
                        <CommentModule ref={commentModuleRef} />
                        <Comment
                            cardId={card.id}
                            comments={comments}
                            createComment={handleCreateComment}
                            updateComment={handleUpdateComment}
                            deleteComment={handleDeleteComment}
                        />
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