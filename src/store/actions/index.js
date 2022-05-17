import {
  SET_CURRENT_PAGE,
  SET_LOADING_CHARACTER_LIST,
  SET_CHARACTER_LIST,
  SET_SELECTED_CHARACTER,
  SET_SEARCH_TEXT,
} from "./actionTypes";

export const setCurrentPage = (data) => {
  return {
    type: SET_CURRENT_PAGE,
    data,
  };
};

export const setLoadingCharacterList = (data) => {
  return {
    type: SET_LOADING_CHARACTER_LIST,
    data,
  };
};

export const setCharacterList = (data) => {
  return {
    type: SET_CHARACTER_LIST,
    data,
  };
};

export const setSelectedCharacter = (data) => {
  return {
    type: SET_SELECTED_CHARACTER,
    data,
  };
};

export const setSearchText = (data) => {
  return {
    type: SET_SEARCH_TEXT,
    data,
  };
};
