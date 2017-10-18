export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const VOTE_POST = 'VOTE_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const CREATE_POST = 'CREATE_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const FETCH_POST = 'FETCH_POST'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const FETCH_COMMENT = 'FETCH_COMMENT'

const apiUrl = 'http://localhost:3001/'


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

export const createComment = (postID, comment) => {
  comment.timestamp = Date.now()
  comment.id = Math.floor(Math.random() * 10000000)
  comment.parentId = postID

  return (dispatch) => {
    fetch(`http://localhost:3001/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'asdf'
      }
    })
    .then(res => res.json())
    .then(comment => dispatch(createCommentAction(comment)))
  }
}

export const deletePost = (postID) => {

  return (dispatch) => {
    fetch(`http://localhost:3001/posts/${postID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'asdf'
      }
    })
    .then(res => res.json())
    .then(post => dispatch(deletePostAction(post)))
  }
}

export const deleteComment = (commentID) => {

  return (dispatch) => {
    fetch(`http://localhost:3001/comments/${commentID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'asdf'
      }
    })
    .then(res => res.json())
    .then(comment => dispatch(deleteCommentAction(comment)))
  }
}

export const editPost = (postID, post) => {

  return (dispatch) => {
    fetch(`http://localhost:3001/posts/${postID}`, {
      method: 'PUT',
      body: JSON.stringify(post),
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'asdf'
      }
    })
    .then(res => res.json())
    .then(post => dispatch(editPostAction(post)))
  }
}

export const fetchPost = (postID) => {

  return (dispatch) => {
    fetch(`http://localhost:3001/posts/${postID}`, {
      headers: { 'Authorization' : 'asdf' }
    })
    .then(res => res.json())
    .then(post => dispatch(fetchPostAction(post)))
  }
}

export const editComment = (commentID, body) => {
  const timestamp = Date.now()

  return (dispatch) => {
    fetch(`http://localhost:3001/comments/${commentID}`, {
      method: 'PUT',
      body: JSON.stringify({ body: body, timestamp: timestamp }),
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'asdf'
      }
    })
    .then(res => res.json())
    .then(comment => dispatch(editCommentAction(comment)))
  }
}

export const fetchComment = (commentID) => {

  return (dispatch) => {
    fetch(`http://localhost:3001/comments/${commentID}`, {
      headers: { 'Authorization' : 'asdf' }
    })
    .then(res => res.json())
    .then(comment => dispatch(fetchCommentAction(comment)))
  }
}

export const editCommentAction = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export const fetchCommentAction = (comment) => {
  return {
    type: FETCH_COMMENT,
    comment
  }
}

export const fetchPostAction = (post) => {
  return {
    type: FETCH_POST,
    post
  }
}

export const editPostAction = (post) => {
  return {
    type: EDIT_POST,
    post
  }
}

export const deleteCommentAction = (comment) => {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export const deletePostAction = (post) => {
  return {
    type: DELETE_POST,
    post
  }
}

export const createCommentAction = (comment) => {
  return {
    type: CREATE_COMMENT,
    comment
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
