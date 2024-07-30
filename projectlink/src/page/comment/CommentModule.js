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
            const response = await commentApi.createComment(cardId, newComment);
            setComments(prevComments => [...prevComments, response.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateComment = async (commentId, updatedComment) => {
        try {
            const response = await commentApi.updateComment(commentId, updatedComment);
            setComments(prevComments => prevComments.map(comment => (comment.id === commentId ? response.data : comment)));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            await commentApi.deleteComment(commentId);
            setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error(error);
        }
    };

    const getCommentById = async (commentId) => {
        try {
            const response = await commentApi.getCommentById(commentId);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getCommentsByCardId = async (cardId) => {
        try {
            const response = await cardApi.getCardById(cardId);
            return response.data.comments; // 댓글 목록 반환
        } catch (error) {
            console.error(error);
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
            {/* 필요한 경우 댓글 목록을 여기서 렌더링할 수 있습니다. */}
        </div>
    );
});

export default CommentModule;
