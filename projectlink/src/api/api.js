import axios from "axios";

/* == Axios - instance */
const instance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

export const labelApi = {
    updateLabel: (labelData) => instance.put("/api/v1/cards/labels", labelData),
    createLabel: (newLabel) => instance.post("/api/v1/cards/labels/new", newLabel),
};

export const cardApi = {
    // (listId) 리스트의 카드 조회
    getCardsByListId: (listId) => instance.get(`/api/v1/lists/${listId}/cards`),
    // (listId) 리스트에 새로운 카드 생성 
    createCardInList: (listId, newCard) => instance.post(`/api/v1/lists/${listId}/cards`, newCard),
    // (cardId) 카드 조회
    getCardById: (cardId) => instance.get(`/api/v1/lists/cards/${cardId}`),
    // (cardId) 카드 삭제
    deleteCard: (cardId) => instance.delete(`/api/v1/lists/cards/${cardId}`),
    // (cardId) 카드 업데이트
    updateCard: (cardId, updatedData) => instance.patch(`/api/v1/lists/cards/${cardId}`, updatedData),
    // 모든 카드 조회
    getAllCards: () => instance.get("/api/v1/lists/cards"),
};

export const boardListApi = {
    // 보드 리스트의 카드 업데이트
    updateCardInList: (boardId, listId, cardData) => instance.put(`/api/v1/boards/${boardId}/lists/${listId}/cards`, cardData),
    // (boardId) 보드의 모든 리스트 조회
    getListsByBoardId: (boardId) => instance.get(`/api/v1/boards/${boardId}/lists`),
    // 새로운 리스트 생성
    createListInBoard: (boardId, newList) => instance.post(`/api/v1/boards/${boardId}/lists`, newList),
    // (listId) 보드 리스트 조회
    getListById: (listId) => instance.get(`/api/v1/boards/lists/${listId}`),
    // (listId) 보드 리스트 제목 업데이트
    updateListTitle: (listId, updatedTitle) => instance.patch(`/api/v1/boards/lists/${listId}`, updatedTitle),
    // (listId) 보드 리스트 삭제
    deleteList: (listId) => instance.delete(`/api/v1/lists/${listId}`),
};

export const commentApi = {
    updateComment: (commentId, updatedComment) => instance.put(`/api/v1/cards/comments/${commentId}`, updatedComment),
    deleteComment: (commentId) => instance.delete(`/api/v1/cards/comments/${commentId}`),
    createComment: (cardId, newComment) => instance.post(`/api/v1/cards/${cardId}/comments`, newComment),
    getCommentById: (commentId) => instance.get(`/api/v1/cards/comments/${commentId}`),
};

export const userApi = {
    addUserToBoard: (username, boardId) => instance.post(`/api/v1/${username}/boards/${boardId}`),
    registerUser: (userData) => instance.post("/api/v1/register", userData),
    getUserBoards: (username) => instance.get(`/api/v1/${username}/boards`),
    getAllUsers: () => instance.get("/api/v1/users"),
    getUserByUsername: (username) => instance.get(`/api/v1/users/${username}`),
};
  
export const boardApi = {
    getBoardById: (boardId) => instance.get(`/api/v1/boards/${boardId}`),
    updateBoard: (boardId, updatedBoard) => instance.put(`/api/v1/boards/${boardId}`, updatedBoard),
    createBoard: (boardData) => instance.post(`/api/v1/boards`, boardData),
    deleteBoard: (boardId) => instance.delete(`/api/v1/boards/${boardId}`),
    getAllBoards: () => instance.get("/api/v1/boards"),
};