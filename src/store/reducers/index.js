import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentPage: 0,
  loadingCharacterList: false,
  characterList: [],
  selectedCharacter: {},
  searchText: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.data };
    }

    case actionTypes.SET_LOADING_CHARACTER_LIST: {
      return { ...state, loadingCharacterList: action.data };
    }

    case actionTypes.SET_CHARACTER_LIST: {
      return { ...state, characterList: action.data };
    }

    case actionTypes.SET_SELECTED_CHARACTER: {
      return { ...state, selectedCharacter: action.data };
    }

    case actionTypes.SET_SEARCH_TEXT: {
      return { ...state, searchText: action.data };
    }

    default:
      return state;
  }
};

export default reducer;
