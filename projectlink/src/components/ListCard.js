import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import { Trash2, Calendar, MessageCircle } from "react-feather";
import './ListCard.css';
import Modal from '../page/boardList/BoardListModal';
import Comment from '../page/comment/Comment';
import CommentModule from '../page/comment/CommentModule';
import { fileApi } from '../api/api';

const ListCard = ({ card, step, handleDeleteCard, updateCardInList }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [description, setDescription] = useState(card.description);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [files, setFiles] = useState([]);
    const commentModuleRef = useRef(null);
    const createdDate = card.created ? moment(card.created).format("YYYY년 MM월 DD일") : "";

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

        const fetchFiles = async () => {
            try {
                const response = await fileApi.getFilesByCardId(card.id);
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        if (isModalOpen) {
            fetchComments();
            fetchFiles();
        }
    }, [isModalOpen, card.id]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateComment = async (cardId, newComment) => {
        if (commentModuleRef.current) {
            await commentModuleRef.current.createComment(cardId, newComment);
            const cardComments = await commentModuleRef.current.getCommentsByCardId(cardId);
            setComments(cardComments);
        }
    };

    const handleUpdateComment = async (commentId, updatedComment) => {
        if (commentModuleRef.current) {
            await commentModuleRef.current.updateComment(commentId, updatedComment);
            const cardComments = await commentModuleRef.current.getCommentsByCardId(card.id);
            setComments(cardComments);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (commentModuleRef.current) {
            await commentModuleRef.current.deleteComment(commentId);
            const cardComments = await commentModuleRef.current.getCommentsByCardId(card.id);
            setComments(cardComments);
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSaveDescription = async () => {
        await updateCardInList(card.id, { description });
        setIsEditingDescription(false);
    };

    const handleFileChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append("files", file);
        });
        formData.append("cardId", card.id);

        try {
            await fileApi.uploadFiles(formData, card.id);
            const response = await fileApi.getFilesByCardId(card.id);
            setFiles(response.data);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    const handleFileDownload = async (fileId, fileName) => {
        try {
            const response = await fileApi.downloadFile(fileId);
            const url = URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleFileDelete = async (fileId) => {
        try {
            await fileApi.deleteFile(fileId);
            const response = await fileApi.getFilesByCardId(card.id);
            setFiles(response.data);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    return (
        <>
            <div className="list-card" onClick={handleOpenModal}>
                <div className="list-card-label">low priority</div> {/* label 기능 구현 후 로직 수정 요망 */}
                <div className="list-card-title">{card.title}</div>
                <div className="list-card-footer">
                    <Calendar size={16} />
                    <span className="list-card-date">{createdDate}</span>
                    <span className="list-card-comments">
                        <MessageCircle size={16} />
                        {comments.length}
                    </span> {/* 댓글 개수 표시 */}
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
                        <div className="description-top">
                            <span className="description-font">Description {card.description}</span>
                            <button onClick={handleSaveDescription} className="save-description-button">Save</button>
                        </div>
                        {isEditingDescription ? (
                            <>
                                <textarea
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    className="description-textarea"
                                />
                            </>
                        ) : (
                            <p className="description-text" onClick={() => setIsEditingDescription(true)}>{description || "Add a more detailed description..."}</p>
                        )}
                        <div className="file-upload-section">
                            <input type="file" multiple onChange={handleFileChange} />
                            {files.length > 0 && (
                                <div>
                                    {files.map((file) => (
                                        <div key={file.id} className="file-item">
                                            <p>{file.fileName}</p>
                                            <button onClick={() => handleFileDownload(file.id, file.fileName)}>Download</button>
                                            <button onClick={() => handleFileDelete(file.id)}>Delete</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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