export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const VOTE_POST = 'VOTE_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const CREATE_POST = 'CREATE_POST'

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

export const fetchComments = (postID) => {
  return dispatch => {
    fetch(`http://localhost:3001/posts/${postID}/comments`, {
      headers: {
        'Authorization' : 'asdf'
      }
    })
    .then(res => res.json())
    .then(comments => dispatch(receiveComments(comments)))
  }
}

export const votePost = (postID, option) => {
  return (dispatch) => {
    fetch(`http://localhost:3001/posts/${postID}`, {
      method: 'POST',
      body: JSON.stringify({ option }),
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'asdf'
      }
    })
    .then(res => res.json())
    .then(data => dispatch(votePostAction(data)))
  }
}

export const voteComment = (commentID, option) => {
  return (dispatch) => {
    fetch(`http://localhost:3001/comments/${commentID}`, {
      method: 'POST',
      body: JSON.stringify({ option }),
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'asdf'
      }
    })
    .then(res => res.json())
    .then(comment => dispatch(voteCommentAction(comment)))
  }
}

export const createPost = (post) => {
  post.timestamp = Date.now()
  post.id = Math.floor(Math.random() * 10000000)

  return (dispatch) => {
    fetch(`http://localhost:3001/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'asdf'
      }
    })
    .then(res => res.json())
    .then(post => dispatch(createPostAction(post)))
  }
}

export const createPostAction = (post) => {
  return {
    type: CREATE_POST,
    post
  }
}

export const voteCommentAction = (comment) => {
  return {
    type: VOTE_COMMENT,
    comment
  }
}

export const votePostAction = (post) => {
  return {
    type: VOTE_POST,
    post
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

export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}
