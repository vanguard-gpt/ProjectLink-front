import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { cardApi, commentApi } from '../../api/api';

const CommentModule = forwardRef((props, ref) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                // 이 부분은 필요한 경우 초기 데이터를 가져올 수 있습니다.
                // const commentsResponse = await commentApi.getCommentsByCardId(cardId);
                // setComments(commentsResponse.data);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };

        fetchComments();
    }, []);

    const createComment = async (cardId, newComment) => {
        try {
            console.log("Sending comment data to backend:", newComment);  // 로그 추가
            const response = await commentApi.createComment(cardId, newComment);
            setComments(prevComments => [...prevComments, response.data]);
        } catch (error) {
            console.error("Error creating comment:", error);  // 로그 추가
        }
    };

    const updateComment = async (commentId, updatedComment) => {
        try {
            console.log("Sending updated comment data to backend:", updatedComment);  // 로그 추가
            const response = await commentApi.updateComment(commentId, updatedComment);
            setComments(prevComments => prevComments.map(comment => (comment.id === commentId ? response.data : comment)));
        } catch (error) {
            console.error("Error updating comment:", error);  // 로그 추가
        }
    };

    const deleteComment = async (commentId) => {
        try {
            console.log("Sending delete request to backend for comment ID:", commentId);  // 로그 추가
            await commentApi.deleteComment(commentId);
            setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);  // 로그 추가
        }
    };

    const getCommentById = async (commentId) => {
        try {
            const response = await commentApi.getCommentById(commentId);
            return response.data;
        } catch (error) {
            console.error("Error fetching comment by ID:", error);  // 로그 추가
        }
    };

    const getCommentsByCardId = async (cardId) => {
        try {
            const response = await cardApi.getCardById(cardId);
            console.log("Fetched comments by card ID:", response.data.comments);  // 로그 추가
            return response.data.comments; // 댓글 목록 반환
        } catch (error) {
            console.error("Error fetching comments by card ID:", error);  // 로그 추가
        }
    };

    useImperativeHandle(ref, () => ({
        createComment,
        updateComment,
        deleteComment,
        getCommentById,
        getCommentsByCardId,
    }));

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="comments">
        </div>
    );
});

export default CommentModule;
