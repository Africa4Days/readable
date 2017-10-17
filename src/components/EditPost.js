import React, { Component } from 'react';
import { Menu, Icon, Container, Header, Divider } from 'semantic-ui-react';
import { Field, reduxForm, initialize, reset } from 'redux-form'
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { editPost, fetchPost } from '../actions'

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
  }

  mySubmit = (values) => {
    this.props.dispatch(editPost(this.props.match.params.id, values))
    console.log(values)
    this.props.history.push('/')
  }

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
      <Menu secondary size='large'>
        <Menu.Item name='back' onClick={() => window.history.back()}>
          <Icon size='large' name='chevron left' />
        </Menu.Item>
      </Menu>
      <Container>
        <Header as='h2' textAlign='left'>Edit Post</Header>
        <Divider />


        <form onSubmit={handleSubmit(this.mySubmit)}>
          <div>
            <label>Title</label>
            <div>
              <Field
                name='title'
                component='input'
                type='text'
                placeholder='Post title'
              />
          </div>
          </div>
          <div>
            <label>Author</label>
            <div>
              <Field
                name='author'
                component='input'
                type='text'
                placeholder='Post author'
              />
            </div>
          </div>
          <div>
            <label>Body</label>
            <div>
              <Field
                name='body'
                component='textarea'
              />
            </div>
          </div>
          <div>
            <label>Category</label>
            <div>
              <Field
                name='category'
                component='select'
              >
                <option />
                <option value={categories[0].name}>{categories[0].name}</option>
                <option value={categories[1].name}>{categories[1].name}</option>
                <option value={categories[2].name}>{categories[2].name}</option>
              </Field>
            </div>
          </div>
          <button type='submit'>Add Changes</button>
          </form>


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

export default EditPost
