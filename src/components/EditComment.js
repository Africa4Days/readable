import React, { Component } from 'react';
import { Menu, Icon, Container, Header, Divider } from 'semantic-ui-react';
import { Field, reduxForm, initialize, reset } from 'redux-form'
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { editComment, fetchComment } from '../actions'

class EditComment extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1000)
    this.props.dispatch(fetchComment(this.props.match.params.id))
    this.props.dispatch(reset('EditComment'))
  }

  editCommentSubmit = (values) => {
    this.props.dispatch(editComment(this.props.match.params.id, values))
    console.log(values)
  }

  render() {
    const { handleSubmit } = this.props
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
        <Header as='h2' textAlign='left'>Edit Comment</Header>
        <Divider />


        <form onSubmit={handleSubmit(this.editCommentSubmit)}>
          <div>
            <label>Author</label>
            <div>
              {this.props.comment.author}
            </div>
          </div>
          <div>
            <label>Body</label>
            <div>
              <Field
                name='body'
                component='textarea'
                placeholder='Comment Body'
              />
            </div>
          </div>
          <button type='submit'>Update Comment</button>
        </form>


      </Container>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    comment: state.reducer.comment
  }
}

const editCommentForm = reduxForm({
  form: 'EditComment',
  keepDirtyOnReinitialize: true
})

EditComment = connect(mapStateToProps)(editCommentForm(EditComment))

export default EditComment
