import React, { Component } from 'react';
import { Menu, Icon, Container, Header, Divider, Form, Button } from 'semantic-ui-react';
import { Field, reduxForm, initialize, reset } from 'redux-form'
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { editPost, fetchPost } from '../actions'
import { withRouter } from 'react-router'

class EditPost extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1000)
    this.props.dispatch(fetchPost(this.props.match.params.id))
    this.props.dispatch(reset('editForm'))
  }

  componentWillReceiveProps(nextProps) {
    this.props.dispatch(initialize('editForm', nextProps.post, true))
    if (this.state.loading && this.props.post && this.props.categories) {
      this.setState({ loading: false })
    }
  }

  mySubmit = (values) => {
    this.props.dispatch(editPost(values.id, values))
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
        <Menu.Item name='back' onClick={() => this.props.history.goBack()}>
          <Icon size='large' name='chevron left' />
        </Menu.Item>
      </Menu>
      <Container textAlign='left'>
        <Header as='h2' textAlign='left'>Edit Post</Header>
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
          <Button type='submit'>Add Changes</Button>
          </Form>


      </Container>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.reducer.categories,
    post: state.reducer.post,
  }
}

const newForm = reduxForm({
  form: 'editForm',
  keepDirtyOnReinitialize: true
})

EditPost = connect(mapStateToProps)(newForm(EditPost))

export default withRouter(EditPost)
