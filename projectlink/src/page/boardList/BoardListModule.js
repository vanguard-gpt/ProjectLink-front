import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { cardApi, boardListApi } from '../../api/Api';
import List from '../../components/List';

const BoardListModule = forwardRef(({ boardId }, ref) => {
    const [lists, setLists] = useState([]);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBoardLists = async () => {
            setLoading(true);
            try {
                const listsResponse = await boardListApi.getListsByBoardId(boardId);
                const cardsResponse = await cardApi.getAllCards();
                setLists(listsResponse.data);
                setCards(cardsResponse.data);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };

        fetchBoardLists();
    }, [boardId]);

    const createCardInList = async (listId, newCard) => {
        try {
            const response = await cardApi.createCardInList(listId, newCard);
            setCards(prevCards => [...prevCards, response.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateCardInList = async (cardId, updatedData) => {
        try {
            const response = await cardApi.updateCard(cardId, updatedData);
            setCards(prevCards => prevCards.map(card => (card.id === cardId ? response.data : card)));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCardFromList = async (cardId) => {
        try {
            await cardApi.deleteCard(cardId);
            setCards(prevCards => prevCards.filter(card => card.id !== cardId));
        } catch (error) {
            console.error(error);
        }
    };

    const createListInBoard = async (newList) => {
        try {
            const response = await boardListApi.createListInBoard(boardId, newList);
            console.log(response);
            setLists(response.data.lists);
        } catch (error) {
            console.error(error);
        }
    };

    const updateListTitle = async (listId, updatedTitle) => {
        try {
            const response = await boardListApi.updateListTitle(listId, updatedTitle);
            setLists(prevLists => prevLists.map(list => (list.id === listId ? response.data : list)));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteListFromBoard = async (listId) => {
        try {
            await boardListApi.deleteList(listId);
            setLists(prevLists => prevLists.filter(list => list.id !== listId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteList = async (listId) => {
        try {
            await deleteListFromBoard(listId);
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };

    const handleDeleteCard = async (cardId) => {
        try {
            await deleteCardFromList(cardId);
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    /*
    상태가 반영이 안되었던 코드

    const handleRenameList = async (listId, newTitle) => {
        try {
            await updateListTitle(listId, newTitle);
        } catch (error) {
            console.error('Error renaming list:', error);
        }
    };*/

    const handleRenameList = async (listId, newTitle) => {
        try {
            await updateListTitle(listId, newTitle);
            setLists(prevLists => prevLists.map(list => (list.id === listId ? { ...list, title: newTitle } : list)));
        } catch (error) {
            console.error('Error renaming list:', error);
        }
    };

    useImperativeHandle(ref, () => ({
        createCardInList,
        updateCardInList,
        deleteCardFromList,
        createListInBoard,
        updateListTitle,
        deleteListFromBoard,
        handleDeleteList,
        handleDeleteCard,
        handleRenameList
    }));

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="board-lists">
            {lists.map((list, index) => (
                <List
                    key={`${list.id}-${index}`}
                    list={list}
                    handleDeleteList={handleDeleteList}
                    handleCreateCard={createCardInList}
                    handleDeleteCard={handleDeleteCard}
                    handleRenameList={handleRenameList}
                    updateCardInList={updateCardInList}
                />
            ))}
        </div>
    );
});

export default BoardListModule;
