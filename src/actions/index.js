export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_COMMENTS'

export const fetchPosts = () => {
  return (dispatch) => {
    fetch('http://localhost:3001/posts', {
      headers: { 'Authorization': 'asdf' }
    })
    .then(res => res.json())
    .then(res => dispatch(receivePosts(res)))
  }
}

export const fetchCategories = () => {
  return (dispatch) => {
    fetch('http://localhost:3001/categories', {
      headers: { 'Authorization' : 'asdf' }
    })
    .then((res) => res.json())
    .then((categories) => dispatch(receiveCategories(categories)))
  }
}

export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export const receiveCategories = (categories) => {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}
