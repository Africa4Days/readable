import React, { Component } from 'react';
import { Menu, Icon, Container, Header, Divider, Form, Button } from 'semantic-ui-react';
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

  componentWillReceiveProps(nextProps) {
    this.props.dispatch(initialize('EditComment', nextProps.comment, true))
    if (this.state.loading && this.props.comment) {
      this.setState({ loading: false })
    }
  }

  editCommentSubmit = (values) => {
    this.props.dispatch(editComment(this.props.match.params.id, values.body))
    console.log(values)
    this.props.history.goBack()
  }

  required = (value) => value ? undefined : 'Required'

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
      <Menu id='menu' pointing secondary size='large'>
        <Menu.Item name='back' onClick={() => this.props.history.goBack()}>
          <Icon size='large' name='chevron left' />
        </Menu.Item>
      </Menu>
      <Container textAlign='left'>
        <Header as='h2' textAlign='left'>Edit Comment</Header>
        <Divider />


        <Form onSubmit={handleSubmit(this.editCommentSubmit)}>
          <div>

          </div>
          <div>
            <label>Body</label>
            <div id='author'>
              <Field
                name='body'
                component='textarea'
                placeholder='Comment Body'
                validate={this.required}
              />
            </div>
          </div>
          <Button type='submit'>Update Comment</Button>
        </Form>


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
