import {
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES,
  RECEIVE_COMMENTS,
  VOTE_POST,
  VOTE_COMMENT,
  CREATE_POST,
  CREATE_COMMENT,
  DELETE_POST,
  DELETE_COMMENT,
  EDIT_POST
} from '../actions'

const initialState = {
  posts: [],
  categories: [],
  comments: []
}

const reducer = (state = initialState, action) => {

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
    case VOTE_POST :
      return {
        ...state,
        posts: [...state.posts.filter(post => post.id !== action.post.id), action.post]
      }
    case CREATE_POST :
      return {
        ...state,
        posts: [...state.posts, ...action.post]
      }
    case DELETE_POST :
      return {
        ...state,
        posts: [...state.posts.filter(post => post.id !== action.post.id)]
      }
    case EDIT_POST :
      return {
        ...state,
        posts: [...state.posts.filter(post => post.id !== action.post.id), action.post]
      }
    case RECEIVE_COMMENTS :
      return {
        ...state,
        comments: action.comments
      }
    case VOTE_COMMENT :
      return {
        ...state,
        comments: [...state.comments.filter(comment => comment.id !== action.comment.id), action.comment]
      }
    case CREATE_COMMENT :
      return {
        ...state,
        comments: [...state.comments, ...action.comment]
      }
    case DELETE_COMMENT :
      return {
        ...state,
        comments: [...state.comments.filter(comment => comment.id !== action.comment.id)]
      }
    default:
      return state;
    }
}

export default reducer;
