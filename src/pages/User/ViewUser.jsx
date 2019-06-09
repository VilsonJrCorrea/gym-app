/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { getUser } from '../../services/userService';
import Dashboard from '../../components/Layout/Dashboard';
// import Equipment from "../../components/Equipment/Equipment";
import User from '../../components/User/User';

class ViewUser extends React.Component {
  async componentDidMount() {
    await this.getDatum();
  }

  async getDatum() {
    try {
      const { id } = this.props.match.params;
      const { data: userSaved } = await getUser(id);
      this.setState({ user: userSaved });
    } catch (e) {
      console.log(e);
    }
  }

  renderUserDisabled = () => {
    const { user } = this.state;
    console.log(user);
    return (
      <div>
        <Col md={{ span: 12, offset: 0 }}>
          <Card.Body>
            <form>
              <User data={user} disabled errors={{}} />
            </form>
          </Card.Body>
        </Col>
      </div>
    );
  };

  render() {
    return (
      <Dashboard title="Dados Usuário">
        {this.state ? this.renderUserDisabled() : <Spinner animation="border" variant="primary" />}
      </Dashboard>
    );
  }
}

export default ViewUser;
