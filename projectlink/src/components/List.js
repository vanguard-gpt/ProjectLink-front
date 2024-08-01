import React, { useState, useEffect } from 'react';
import './List.css';
import ListCard from './ListCard';
import { cardApi } from '../api/Api';
import ListMenu from './ListMenu';

const List = ({ list, handleDeleteList, handleCreateCard, handleDeleteCard, handleRenameList, updateCardInList }) => {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await cardApi.getCardsByListId(list.id);
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, [list.id]);

  const handleAddCard = async () => {
    if (newCardTitle.trim()) {
      await handleCreateCard(list.id, { 
        title: newCardTitle,
        board_list_id: list.id
      });
      setNewCardTitle('');
      setIsAddingCard(false);
      const response = await cardApi.getCardsByListId(list.id);
      setCards(response.data);
    }
  };

  const handleCardDelete = async (cardId) => {
    await handleDeleteCard(cardId, list.id);
    const response = await cardApi.getCardsByListId(list.id);
    setCards(response.data);
  };

  const handleRename = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await handleRenameList(list.id, newTitle);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    setNewTitle(list.title); // list.title 변경 시 newTitle 업데이트
  }, [list.title]);

  return (
    <div className="list-container">
      <div className="list-header">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onKeyPress={handleTitleKeyPress}
            onBlur={() => setIsEditing(false)}
            className="list-title-edit"
          />
        ) : (
          <h2 onClick={handleRename}>{newTitle}</h2> // newTitle을 사용
        )}
        <ListMenu
          onRename={handleRename}
          onDelete={() => handleDeleteList(list.id)}
        />
      </div>
      <div className="card__content">
        {cards.length > 0 ? (
          cards.map(card => (
            <ListCard key={card.id} card={card} step={list.title} handleDeleteCard={handleCardDelete} updateCardInList={updateCardInList} />
          ))
        ) : (
          <p>No cards in this list</p>
        )}
        {isAddingCard ? (
          <div className="add-card-form">
            <input
              type="text"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              placeholder="이름을 입력하세요"
              className="add-card-input"
            />
            <button onClick={handleAddCard} className="add-card-submit">
              Add Card
            </button>
          </div>
        ) : (
          <button className="add-card-button" onClick={() => setIsAddingCard(true)}>
            + Add a card
          </button>
        )}
      </div>
    </div>
  );
};

export default List;


/*
const List = ({ list, handleDeleteList, handleCreateCard, handleDeleteCard, handleRenameList, updateCardInList}) => {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await cardApi.getCardsByListId(list.id);
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, [list.id]);

  const handleAddCard = async () => {
    if (newCardTitle.trim()) {
      await handleCreateCard(list.id, { 
        title: newCardTitle,
        board_list_id: list.id  // list.id를 board_list_id로 사용
      });
      setNewCardTitle('');
      setIsAddingCard(false);
      // Fetch cards again or update local state accordingly
      const response = await cardApi.getCardsByListId(list.id);
      setCards(response.data);
    }
  };

  const handleCardDelete = async (cardId) => {
    await handleDeleteCard(cardId, list.id);
    // Fetch cards again or update local state accordingly
    const response = await cardApi.getCardsByListId(list.id);
    setCards(response.data);
  };

  const handleRename = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await handleRenameList(list.id, newTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className="list-container">
      <div className="list-header">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onKeyPress={handleTitleKeyPress}
            onBlur={() => setIsEditing(false)} // focus를 잃으면 편집 모드를 종료
            className="list-title-edit"
          />
        ) : (
          <h2 onClick={handleRename}>{list.title}</h2>
        )}
        <ListMenu
          onRename={handleRename}
          onDelete={() => handleDeleteList(list.id)}
        />
      </div>
      <div className="card__content">
        {cards.length > 0 ? (
          cards.map(card => (
            <ListCard key={card.id} card={card} step={list.title} handleDeleteCard={handleCardDelete} updateCardInList={updateCardInList}/>
          ))
        ) : (
          <p>No cards in this list</p>
        )}
        {isAddingCard ? (
          <div className="add-card-form">
            <input
              type="text"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              placeholder="이름을 입력하세요"
              className="add-card-input"
            />
            <button onClick={handleAddCard} className="add-card-submit">
              Add Card
            </button>
          </div>
        ) : (
          <button className="add-card-button" onClick={() => setIsAddingCard(true)}>
            + Add a card
          </button>
        )}
      </div>
    </div>
  );
};

export default List;
*/