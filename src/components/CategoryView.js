import React, { Component } from 'react';
import { Menu, Dimmer, Loader, Divider, Dropdown, Button, Header, Container } from 'semantic-ui-react'
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

  render() {
    const { loading } = this.state
    const { posts, categories } = this.props

    if (loading) {
      return (
        <Dimmer active>
          <Loader content='loading' />
        </Dimmer>
      )
    } else {
      return (
        <div>
        <Menu id='menu' pointing secondary size='large'>
        <Menu.Item header>READABLE</Menu.Item>
        <Menu.Item
          name='home'

          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
        <Menu.Item header>CATEGORIES</Menu.Item>
        <Link
          to={categories[0].name + '/posts'}
        >
          <Menu.Item
            name={categories[0].name}

            onClick={this.handleItemClick}
          >

          </Menu.Item>
          </Link>

          <Link
            to={categories[1].name + '/posts'}
          >
          <Menu.Item
            name={categories[1].name}

            onClick={this.handleItemClick}
          >

          </Menu.Item>
          </Link>

          <Link
            to={categories[2].name + '/posts'}
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
        </Container>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.reducer.posts,
    categories: state.reducer.categories
  }
}

export default connect(mapStateToProps)(CategoryView)
