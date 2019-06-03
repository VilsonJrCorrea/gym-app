/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { getProfessional } from '../../services/professionalService';
import Dashboard from '../../components/Layout/Dashboard';
import Professional from '../../components/Professional/Professional';

class ViewProfessional extends React.Component {
  async componentDidMount() {
    await this.getDatum();
  }

  async getDatum() {
    try {
      const { id } = this.props.match.params;
      const { data: professionalSaved } = await getProfessional(id);
      this.setState({ professional: professionalSaved });
    } catch (e) {
      console.log(e);
    }
  }

  renderProfessionalDisabled = () => {
    const { professional } = this.state;
    return (
      <div>
        <Col md={{ span: 12, offset: 0 }}>
          <Card.Body>
            <form>
              <Professional
                data={professional}
                disabled
                errors={{}}
              />
            </form>
          </Card.Body>
        </Col>
      </div>
    );
  };

  render() {
    return (
      <Dashboard title="Dados Profissional">
        {this.state ? this.renderProfessionalDisabled() : <Spinner animation="border" variant="primary" />}
      </Dashboard>
    );
  }
}

export default ViewProfessional;
