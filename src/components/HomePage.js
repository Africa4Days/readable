import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Button, Feed, Container, Dropdown, Icon, Divider, Dimmer, Loader, Header } from 'semantic-ui-react';
import { fetchPosts, fetchCategories } from '../actions'
import { Link } from 'react-router-dom'

class HomePage extends Component {
  state = {
    loading: true,
    activeItem: 'home',
    sort: 'most-liked'
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts())
    this.props.dispatch(fetchCategories())
    setTimeout(() => this.setState({ loading: false }), 800)
  }

  handleItemClick = (event, { name }) => {
    this.setState({ activeItem: name })
  }

  handleSortClick = (data) => {
    this.setState({ sort: data })
  }

  thisClick = (post) => {
    console.log(post.id)
  }

  render() {
    const { loading, activeItem, sort } = this.state;
    const { categories, posts } = this.props;

    if (loading) {
      return (
        <div>
          <Dimmer active>
            <Loader content='loading' />
          </Dimmer>
        </div>
      )
    }

    let allPosts
    if (activeItem === 'home') {
      allPosts = posts
    } else if (activeItem === categories[0].name) {
      allPosts = posts.filter((post) => (
        post.category === categories[0].name
      ))
    } else if (activeItem === categories[1].name) {
      allPosts = posts.filter((post) => (
        post.category === categories[1].name
      ))
    } else if (activeItem === categories[2].name) {
      allPosts = posts.filter((post) => (
        post.category === categories[2].name
      ))
    }

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
      <Menu pointing secondary size='large'>
      <Menu.Item header>READABLE</Menu.Item>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={this.handleItemClick}
      />
      <Menu.Menu position='right'>
      <Menu.Item header>CATEGORIES</Menu.Item>
        <Menu.Item
          name={categories[0].name}
          active={activeItem === categories[0].name}
          onClick={this.handleItemClick}
        >

        </Menu.Item>
        <Menu.Item
          name={categories[1].name}
          active={activeItem === categories[1].name}
          onClick={this.handleItemClick}
        >

        </Menu.Item>
        <Menu.Item
          name={categories[2].name}
          active={activeItem === categories[2].name}
          onClick={this.handleItemClick}
        >

        </Menu.Item>
        <Menu.Item>
        <Button circular inverted color='blue' content='New Post' />
        </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Container>

      <Header as ='h2' textAlign='left'>{activeItem}</Header>
      <Menu vertical>
        <Dropdown item text='Sort by'>
          <Dropdown.Menu>
            <Dropdown.Item name='most-liked' active={sort === 'most-liked'} onClick={(e, data) => this.handleSortClick(data.name)}>Most Liked</Dropdown.Item>
            <Dropdown.Item name='least-liked' active={sort === 'least-liked'} onClick={(e, data) => this.handleSortClick(data.name)}>Least liked</Dropdown.Item>
            <Dropdown.Item name='most-recent' active={sort === 'most-recent'} onClick={(e, data) => this.handleSortClick(data.name)}>Most recent</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>

      <Divider />

      {content.map((post) => (
      <Feed key={post.id} size='large'>
        <Feed.Event>

          <Feed.Label>
            <Icon size='large' inverted color='blue' name='user circle' />
          </Feed.Label>

          <Feed.Content>

            <Feed.Date>
              Posted Today by {post.author}
            </Feed.Date>

            <Link
              to={'/posts/' + post.id}
            >
            <Feed.Summary onClick={() => this.thisClick(post)}>
              {post.title}
            </Feed.Summary>
            </Link>

            <Feed.Meta>
              <Feed.Like>
                <Icon id='thumb-up' size='large' name='thumbs up' />
              </Feed.Like>

                <span id='postScore'>{post.voteScore}</span>

              <Feed.Like>
                <Icon id='thumb-down' size='large' name='thumbs down' />
              </Feed.Like>
            </Feed.Meta>

          </Feed.Content>
        </Feed.Event>
      </Feed>
      ))}

      </Container>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    categories: state.categories
  }
}

export default connect(mapStateToProps)(HomePage)
