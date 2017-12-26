import React, { Component } from 'react';
import { Menu, Dimmer, Loader, Divider, Dropdown, Button, Header, Container, Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories, votePost, deletePost } from '../actions'

class CategoryView extends Component {
  state = {
    loading: true,
    sort: 'most-liked'
  }

  handleItemClick = (event, { name }) => {
    this.setState({ activeItem: name })
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts())
    this.props.dispatch(fetchCategories())
    setTimeout(() => this.setState({ loading: false }), 1000)
  }

  readableTime = (timestamp) => {
    let date = new Date(timestamp)
    return date.toDateString()
  }

  postVoting = (event, postId, option) => {
    event.stopPropagation()
    this.props.dispatch(votePost(postId, option))
  }

  handleSortClick = (data) => {
    this.setState({ sort: data })
  }

  onPostDelete = (postID) => {
    this.props.dispatch(deletePost(postID))
    this.props.history.push('/');
  }

  render() {
    const { loading, sort } = this.state
    const { posts, categories } = this.props

    if (loading) {
      return (
        <Dimmer active>
          <Loader content='loading' />
        </Dimmer>
      )
    }

    let allPosts = posts.filter((post) => (
      post.category === this.props.match.params.categories
    ))

    let content
    if (sort === 'most-liked') {
      content = allPosts.sort((a, b) => (
        b.voteScore - a.voteScore
      ))
    } else if (sort === 'least-liked') {
      content = allPosts.sort((a, b) => (
        a.voteScore - b.voteScore
      ))
    } else {
      content = allPosts.sort((a, b) => (
        b.timestamp - a.timestamp
      ))
    }

      return (
        <div>
        <Menu id='menu' pointing secondary size='large'>
        <Menu.Item header>READABLE</Menu.Item>
        <Link
          to={'/'}
        >
        <Menu.Item
          name='home'

          onClick={this.handleItemClick}
        />
        </Link>

        <Menu.Menu position='right'>
        <Menu.Item header>CATEGORIES</Menu.Item>
        <Link
          to={'/' + categories[0].name + '/posts'}
        >
          <Menu.Item
            name={categories[0].name}

            onClick={this.handleItemClick}
          >

          </Menu.Item>
          </Link>

          <Link
            to={'/' + categories[1].name + '/posts'}
          >
          <Menu.Item
            name={categories[1].name}

            onClick={this.handleItemClick}
          >

          </Menu.Item>
          </Link>

          <Link
            to={'/' + categories[2].name + '/posts'}
          >
          <Menu.Item
            name={categories[2].name}

            onClick={this.handleItemClick}
          >

          </Menu.Item>
          </Link>

          <Menu.Item>
          <Button circular inverted color='blue' content='New Post' as={Link} to='/posts'/>
          </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Container>

        <Header as ='h2' textAlign='left'>{this.props.match.params.categories}</Header>
        <Menu vertical>
          <Dropdown item text='Sort by'>
            <Dropdown.Menu>
              <Dropdown.Item name='most-liked' onClick={(e, data) => this.handleSortClick(data.name)}>Most liked</Dropdown.Item>
              <Dropdown.Item name='least-liked' onClick={(e, data) => this.handleSortClick(data.name)}>Least liked</Dropdown.Item>
              <Dropdown.Item name='most-recent' onClick={(e, data) => this.handleSortClick(data.name)}>Most recent</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>

        <Divider />

        {content.map((post) => (
        <Card.Group key={post.id}>
          <Card fluid id='Cards'>
          <Card.Content as={Link} to={'/posts/' + post.id}>
            <Card.Header>{post.title}</Card.Header>
            <Card.Meta>posted by {post.author} on {this.readableTime(post.timestamp)}</Card.Meta>
            <Card.Description>{post.body}</Card.Description>
          </Card.Content>

            <Card.Content extra>
              <Icon id='thumb-up' size='large' name='thumbs outline up' onClick={(event) => this.postVoting(event, post.id, 'upVote')}/>
              {post.voteScore}
              <Icon id='thumb-down' size='large' name='thumbs outline down' onClick={(event) => this.postVoting(event, post.id, 'downVote')}/>

              <Link to={'/posts/' + post.id}>
              <div id='commentsCount'>
                {post.commentCount} comment(s)
              </div>
              </Link>

            </Card.Content>

            <Card.Content extra>
              <Icon size='large' id='trash' name='trash outline' onClick={() => this.onPostDelete(post.id)}/>

              <Link
                to={'/edit/' + post.id}
              >
              <Icon id='edit-detail' size='large' name='edit' />
              </Link>
            </Card.Content>
          </Card>
        </Card.Group>
      ))}

        </Container>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    posts: state.reducer.posts,
    categories: state.reducer.categories
  }
}

export default connect(mapStateToProps)(CategoryView)
