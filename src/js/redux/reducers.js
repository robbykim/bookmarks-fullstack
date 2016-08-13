import actionTypes from './constants';
import { combineReducers } from 'redux';

var searchReducer = function(state, action) {
  state = state || '';

  switch (action.type) {
  case actionTypes.SEARCH_TEXT_CHANGE: {
    return action.text;
  }
  default: {
    return state;
  }
  }
};

var bookmarkReducer = function(state, action) {
  state = state || [];
  var index;

  switch (action.type) {
  case actionTypes.ADD_BOOKMARK_SUCCESS: {
    let tempArr = state.slice();
    tempArr.unshift(action.bookmark);
    return tempArr;
  }
  case actionTypes.GET_BOOKMARKS_SUCCESS: {
    return action.bookmarks;
  }
  case actionTypes.EDIT_BOOKMARK_SUCCESS: {
    let tempArr = state.slice();
    tempArr.forEach(function(value, i) {
      if (value.id === action.bookmark.id) {
        index = i;
      }
    });
    tempArr[index] = action.bookmark;
    return state;
  }
  case actionTypes.DELETE_BOOKMARK_SUCCESS: {
    let tempArr = state.slice();
    tempArr.forEach(function(value, i) {
      if (value.bookmarkid === action.bookmark[0].bookmarkid) {
        index = i;
      }
    });
    tempArr.splice(index, 1);
    return tempArr;
  }
  case actionTypes.ADD_BOOKMARK_ERROR:
  case actionTypes.GET_BOOKMARKS_ERROR:
  case actionTypes.EDIT_BOOKMARK_ERROR:
  case actionTypes.DELETE_BOOKMARK_ERROR: {
    return state;
  }
  default: {
    return state;
  }
  }
};

var folderReducer = function(state, action) {
  // This part of the state is an array
  state = state || [];
  var index;
  switch (action.type) {
  case actionTypes.ADD_FOLDER_SUCCESS: {
    var newState = state.slice();
    newState.push(action.folder);
    return newState;
  }
  case actionTypes.GET_FOLDERS_SUCCESS: {
    return action.folders;
  }
  case actionTypes.DELETE_FOLDER_SUCCESS: {
    let tempArr = state.slice();
    tempArr.forEach(function(value, i) {
      if (value.folderid === action.folder[0].folderid) {
        index = i;
      }
    });
    tempArr.splice(index, 1);
    return tempArr;
  }
  case actionTypes.ADD_FOLDER_ERROR:
  case actionTypes.GET_FOLDERS_ERROR: {
    return state;
  }
  default: {
    return state;
  }
  }
};

var tagReducer = function(state, action) {
  // This part of the state is an array
  state = state || [];

  switch(action.type) {
  case actionTypes.GET_TAGS_SUCCESS: {
    return action.tags;
  }
  case actionTypes.GET_TAGS_ERROR: {
    return state;
  }
  default: {
    return state;
  }
  }
};

var rootReducer = combineReducers({
  bookmarks: bookmarkReducer,
  folders: folderReducer,
  tags: tagReducer,
  search: searchReducer
});

exports.rootReducer = rootReducer;