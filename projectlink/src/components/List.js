import React, { useState, useEffect } from 'react';
import './List.css';
import ListCard from './ListCard';
import { cardApi } from '../api/api';

const List = ({ list, handleDeleteList, handleCreateCard, handleDeleteCard }) => {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isAddingCard, setIsAddingCard] = useState(false);

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

  return (
    <div className="list-container bg-white w-48 h-64 rounded-lg">
      <div className="list-header flex p-2 gap-1 justify-between">
        <div className="circle-group">
          <div className="circle">
            <span className="bg-blue-500 inline-block center w-3 h-3 rounded-full"></span>
          </div>
          <div className="circle">
            <span className="bg-purple-500 inline-block center w-3 h-3 rounded-full"></span>
          </div>
          <div className="circle">
            <span className="bg-pink-500 box inline-block center w-3 h-3 rounded-full"></span>
          </div>
        </div>
        <button className="delete-list-button" onClick={() => handleDeleteList(list.id)}>
          &#10005;
        </button>
      </div>
      <div className="list-title">
        {list.title}
      </div>
      <div className="card__content">
        {cards.length > 0 ? (
          cards.map(card => (
            <ListCard key={card.id} card={card} step={list.title} handleDeleteCard={handleCardDelete} />
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
              placeholder="Enter card title"
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
