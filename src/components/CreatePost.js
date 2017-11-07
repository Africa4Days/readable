import React, { Component } from 'react';
import { Menu, Icon, Container, Header, Divider, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { createPost } from '../actions'

class CreatePost extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1000)
  }

  mySubmit = (values) => {
    this.props.dispatch(createPost(values))
    console.log(values)
    this.props.history.push('/')
  }

  required = (value) => value ? undefined : 'Required'

  render() {
    const { handleSubmit, categories } = this.props
    const { loading } = this.state

    if (loading) {
      return (
        <div>
          <Dimmer active>
            <Loader content='loading' />
          </Dimmer>
        </div>
      )
    }

    return (
      <div>
      <Menu id='menu' pointing secondary size='large'>
        <Menu.Item name='back' as={Link} to='/'>
          <Icon size='large' name='chevron left' />
        </Menu.Item>
      </Menu>
      <Container textAlign='left'>
        <Header as='h2' textAlign='left'>New Post</Header>
        <Divider />


        <Form onSubmit={handleSubmit(this.mySubmit)}>
          <div>
            <label>Title</label>
            <div id='author'>
              <Field
                name='title'
                component='input'
                type='text'
                placeholder='Post title'
                validate={this.required}
              />
          </div>
          </div>
          <div>
            <label>Author</label>
            <div id='author'>
              <Field
                name='author'
                component='input'
                type='text'
                placeholder='Post author'
                validate={this.required}
              />
            </div>
          </div>
          <div>
            <label>Body</label>
            <div id='author'>
              <Field
                name='body'
                component='textarea'
                placeholder='Post body'
                validate={this.required}
              />
            </div>
          </div>
          <div>
            <label>Category</label>
            <div id='author'>
              <Field
                name='category'
                component='select'
                validate={this.required}
              >
                <option />
                <option value={categories[0].name}>{categories[0].name}</option>
                <option value={categories[1].name}>{categories[1].name}</option>
                <option value={categories[2].name}>{categories[2].name}</option>
              </Field>
            </div>
          </div>
          <Button type='submit'>Create post</Button>
          </Form>

      </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.reducer.categories
  }
}

export default reduxForm({ form: 'createForm' })(connect(mapStateToProps)(CreatePost))
