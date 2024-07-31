import React, { useState } from 'react';
import moment from 'moment';
import './Comment.css';

const Comment = ({ cardId, comments = [], createComment, updateComment, deleteComment }) => {
    const [newComment, setNewComment] = useState('');
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');

    const handleCreateComment = async () => {
        if (newComment.trim()) {
            const commentData = { body: newComment };
            await createComment(cardId, commentData);
            setNewComment('');
        }
    };

    const handleEditComment = async (commentId) => {
        if (editCommentText.trim()) {
            const updatedComment = { body: editCommentText, modified: new Date() };
            await updateComment(commentId, updatedComment);
            setEditCommentId(null);
            setEditCommentText('');
        }
    };

    const handleDeleteComment = async (commentId) => {
        await deleteComment(commentId);
    };

    return (
        <div className="comment-section">
            <div className="comment-input-container">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="코멘트 추가..."
                    rows="4"
                    className="comment-box"
                />
                <button className="add-comment-button" onClick={handleCreateComment}>Add Comment</button>
            </div>
            {comments.map(comment => (
                <div key={comment.id} className="comment">
                    <div className="comment-header">
                        <span className="comment-author">
                            {comment.author ? `${comment.author.lastName}` : 'Unknown'}
                        </span>
                        <div className="comment-actions">
                            <button className="comment-button" onClick={() => { setEditCommentId(comment.id); setEditCommentText(comment.body); }}>Edit</button>
                            <button className="comment-button" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                        </div>
                    </div>
                    <div className="comment-content">
                        {editCommentId === comment.id ? (
                            <div className="comment-edit">
                                <textarea
                                    value={editCommentText}
                                    onChange={(e) => setEditCommentText(e.target.value)}
                                    rows="2"
                                    className="comment-box"
                                />
                                <button className="comment-button" onClick={() => handleEditComment(comment.id)}>Update</button>
                                <button className="comment-button" onClick={() => setEditCommentId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <p>{comment.body}</p>
                        )}
                    </div>
                    <div className="comment-date">
                        {comment.modified ? moment(comment.modified).format('YYYY-MM-DD HH:mm') : moment(comment.created).format('YYYY-MM-DD HH:mm')}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comment;


