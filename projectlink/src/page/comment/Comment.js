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
            console.log("Creating new comment with data:", commentData);  // 로그 추가
            await createComment(cardId, commentData);
            setNewComment('');
        }
    };

    const handleEditComment = async (commentId) => {
        if (editCommentText.trim()) {
            const updatedComment = { body: editCommentText };
            console.log("Updating comment with data:", updatedComment);  // 로그 추가
            await updateComment(commentId, updatedComment);
            setEditCommentId(null);
            setEditCommentText('');
        }
    };

    const handleDeleteComment = async (commentId) => {
        console.log("Deleting comment with ID:", commentId);  // 로그 추가
        await deleteComment(commentId);
    };

    return (
        <div className="comment-section">
            <div className="comment-section2">
            <h2>Comments</h2>
            <button className="add-comment-button" onClick={handleCreateComment}>Add Comment</button>
            </div>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="코멘트 추가..."
                rows="4"
                className="comment-box"
            />
            {comments.map(comment => (
                <div key={comment.id} className="comment">
                    <div className="comment-header">
                        <span className="comment-author">
                            {comment.author ? `${comment.author.lastName}` : 'Unknown'}
                        </span>
                        <span className="comment-date">
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
                            <div className="comment-actions">
                                <button className="comment-button" onClick={() => { setEditCommentId(comment.id); setEditCommentText(comment.body); }}>Edit</button>
                                <button className="comment-button" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            </div>
                        )}
                        </span>
                    </div>
                    <div className="comment-content">
                        <p>{comment.body}</p>
                        {moment(comment.created).format('YYYY-MM-DD HH:mm')}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comment;

