/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { getEquipment } from '../../services/equipmentService';
import Dashboard from '../../components/Layout/Dashboard';
// import Equipment from "../../components/Equipment/Equipment";
import Equipment from '../../components/Equipment/Equipment';

class ViewEquipment extends React.Component {

  async componentDidMount() {
    await this.getDatum();
  }

  async getDatum() {
    try {
      const { id } = this.props.match.params;
      const { data: equipmentSaved } = await getEquipment(id);
      this.setState({ equipment: equipmentSaved });
    } catch (e) {
      console.log(e);
    }
  }

  renderEquipmentDisabled = () => {
    const { equipment } = this.state;
    console.log(equipment);
    return (
      <div>
        <Col md={{ span: 12, offset: 0 }}>
          <Card.Body>
            <form>
              <Equipment
                data={equipment}
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
      <Dashboard title="Dados Equipamento">
        {this.state ? this.renderEquipmentDisabled() : <Spinner animation="border" variant="primary" />}
      </Dashboard>
    );
  }
}

export default ViewEquipment;
