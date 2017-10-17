import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';

class EditComment extends Component {
  render() {

    return (
      <div>
        {this.props.commentID}
      </div>
    )
  }
}

export default reduxForm({
  form: 'EditComment'
})(EditComment)
