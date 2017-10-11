import React, { Component } from 'react';
import { Menu, Icon, Container, Header, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class CreatePost extends Component {
  render() {
    return (
      <div>
      <Menu secondary size='large'>
        <Menu.Item name='back' as={Link} to='/'>
          <Icon size='large' name='chevron left' />
        </Menu.Item>
      </Menu>
      <Container>
        <Header as='h2' textAlign='left'>New Post</Header>
        <Divider />
      </Container>
      </div>
    )
  }
}

export default CreatePost
