import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

// Initial state
const initialState = {
  lists: [],
  cards: []
};

// Actions
const SET_LISTS = 'SET_LISTS';
const ADD_LIST = 'ADD_LIST';
const UPDATE_LIST = 'UPDATE_LIST';
const DELETE_LIST = 'DELETE_LIST';
const SET_CARDS = 'SET_CARDS';
const ADD_CARD = 'ADD_CARD';
const UPDATE_CARD = 'UPDATE_CARD';
const DELETE_CARD = 'DELETE_CARD';

// Reducer
const boardReducer = (state, action) => {
  switch (action.type) {
    case SET_LISTS:
      return { ...state, lists: action.payload };
    case ADD_LIST:
      return { ...state, lists: [...state.lists, action.payload] };
    case UPDATE_LIST:
      return {
        ...state,
        lists: state.lists.map(list => list.id === action.payload.id ? action.payload : list)
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.payload)
      };
    case SET_CARDS:
      return { ...state, cards: action.payload };
    case ADD_CARD:
      return { ...state, cards: [...state.cards, action.payload] };
    case UPDATE_CARD:
      return {
        ...state,
        cards: state.cards.map(card => card.id === action.payload.id ? action.payload : card)
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.payload)
      };
    default:
      return state;
  }
};

// Context
const BoardContext = createContext();

// Provider component
export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

// Custom hook to use the BoardContext
export const useBoard = () => {
  return useContext(BoardContext);
};
