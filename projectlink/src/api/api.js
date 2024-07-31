import instance from './axiosInstance';

export const labelApi = {
    updateLabel: (labelData) => instance.put("/api/v1/cards/labels", labelData),
    createLabel: (newLabel) => instance.post("/api/v1/cards/labels/new", newLabel),
};

export const cardApi = {
    getCardsByListId: (listId) => instance.get(`/api/v1/lists/${listId}/cards`),
    createCardInList: (listId, newCard) => instance.post(`/api/v1/lists/${listId}/cards`, newCard),
    getCardById: (cardId) => instance.get(`/api/v1/lists/cards/${cardId}`),
    deleteCard: (cardId) => instance.delete(`/api/v1/lists/cards/${cardId}`),
    updateCard: (cardId, updatedData) => instance.patch(`/api/v1/lists/cards/${cardId}`, updatedData),
    getAllCards: () => instance.get("/api/v1/lists/cards"),
};

export const boardListApi = {
    updateCardInList: (boardId, listId, cardData) => instance.put(`/api/v1/boards/${boardId}/lists/${listId}/cards`, cardData),
    getListsByBoardId: (boardId) => instance.get(`/api/v1/boards/${boardId}/lists`),
    createListInBoard: (boardId, newList) => instance.post(`/api/v1/boards/${boardId}/lists`, newList),
    getListById: (listId) => instance.get(`/api/v1/boards/lists/${listId}`),
    updateListTitle: (listId, updatedTitle) => instance.patch(`/api/v1/boards/lists/${listId}`, updatedTitle),
    deleteList: (listId) => instance.delete(`/api/v1/lists/${listId}`),
};

export const commentApi = {
    updateComment: (commentId, updatedComment) => instance.put(`/api/v1/cards/comments/${commentId}`, updatedComment),
    deleteComment: (commentId) => instance.delete(`/api/v1/cards/comments/${commentId}`),
    createComment: (cardId, newComment) => instance.post(`/api/v1/cards/${cardId}/comments`, newComment),
    getCommentById: (commentId) => instance.get(`/api/v1/cards/comments/${commentId}`),
};

export const userApi = {
    login: (credentials) => instance.post("/api/v1/login", credentials),
    addUserToBoard: (username, boardId) => instance.post(`/api/v1/${username}/boards/${boardId}`),
    registerUser: (userData) => instance.post("/api/v1/register", userData),
    getUserBoards: (username) => instance.get(`/api/v1/${username}/boards`),
    getAllUsers: () => instance.get("/api/v1/users"),
    getUserByUsername: (username) => instance.get(`/api/v1/users/${username}`),
};

export const boardApi = {
    getBoardById: (boardId) => instance.get(`/api/v1/boards/${boardId}`),
    viewStateBoard: (boardId, username, order) => instance.post(`/api/v1/boards/${boardId}`, { username, order }),
    updateBoard: (boardId, updatedBoard) => instance.put(`/api/v1/boards/${boardId}`, updatedBoard),
    createBoard: (boardData) => instance.post(`/api/v1/boards`, boardData),
    deleteBoard: (boardId) => instance.delete(`/api/v1/boards/${boardId}`),
    getAllBoards: () => instance.get("/api/v1/boards"),
};

