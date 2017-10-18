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
    this.props.dispatch(fetchComment(this.props.match.params.id))
    this.props.dispatch(reset('EditComment'))
  }

  componentDidUpdate() {
    if (this.state.loading && this.props.comment) {
      this.setState({ loading: false })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.dispatch(initialize('EditComment', nextProps.comment, true))
  }

  editCommentSubmit = (values) => {
    this.props.dispatch(editComment(this.props.match.params.id, values))
    console.log(values)
    window.history.back()
  }

  render() {
    const { handleSubmit } = this.props
    const { loading } = this.state

    if (loading && this.props.comment) {
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
              <Field
                name='author'
                component='input'
                type='text'
                placeholder='Comment Author'
                disabled
              />
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
