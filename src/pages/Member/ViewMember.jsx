/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { getMember } from '../../services/memberService';
import getSchema from '../../validators/member';
import Dashboard from '../../components/Layout/Dashboard';
import PersonalQuiz from '../../components/Member/PersonalQuiz';
import GeneralQuiz from '../../components/Member/GeneralQuiz';
import Payment from '../../components/Member/Payment';
import Activity from '../../components/Member/Activity';

class ViewMember extends React.Component {
  schema = getSchema();

  async componentDidMount() {
    await this.getDatum();
  }

  async getDatum() {
    try {
      const { id } = this.props.match.params;
      const { data: memberSaved } = await getMember(id);
      this.setState({ member: memberSaved });
    } catch (e) {
      console.log(e);
    }
  }

  renderMemberDisabled = () => {
    const { member } = this.state;
    console.log(member);
    const { atividades, mensalidades } = member;
    return (
      <div>
        <Col md={{ span: 12, offset: 0 }}>
          <Card.Body>
            <form onSubmit={this.handleSubmit}>
              <PersonalQuiz data={member} errors={{}} disabled />
              <GeneralQuiz disabled />
              <Payment data={mensalidades} disabled />
              <Activity data={atividades} disabled />
            </form>
          </Card.Body>
        </Col>
      </div>
    );
  };

  render() {
    return (
      <Dashboard title="Dados aluno">
        {this.state ? this.renderMemberDisabled() : <Spinner animation="border" variant="primary" />}
      </Dashboard>
    );
  }
}

export default ViewMember;
