import {
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES
} from '../actions'

const initialState = {
  posts: [],
  categories: []
}

const posts = (state = initialState, action) => {

  switch (action.type) {
    case RECEIVE_POSTS :
      return {
        ...state,
        posts: action.posts
      }
    case RECEIVE_CATEGORIES :
      return {
        ...state,
        categories: action.categories.categories
      }
    default:
      return state;
    }
}

export default posts
