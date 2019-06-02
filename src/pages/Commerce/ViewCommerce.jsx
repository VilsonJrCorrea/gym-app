/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { getCommerce } from '../../services/commerceService';
import Dashboard from '../../components/Layout/Dashboard';
import Commerce from "../../components/Commerce/Commerce";
import Input from "../../components/common/form/Input";

class ViewCommerce extends React.Component {

  async componentDidMount() {
    await this.getDatum();
  }

  async getDatum() {
    try {
      const { id } = this.props.match.params;
      const { data: commerceSaved } = await getCommerce(id);
      this.setState({ commerce: commerceSaved });
    } catch (e) {
      console.log(e);
    }
  }

  renderCommerceDisabled = () => {
    const { commerce } = this.state;
    console.log(commerce);
    const { produtos } = commerce;
    return (
      <div>
        <Col md={{ span: 12, offset: 0 }}>
          <Card.Body>
            <form>
              <Input
                name="nome"
                type="text"
                disabled
                value={commerce.nome}
                label="Nome"
              />
              <Commerce
                data={produtos}
                disabled
              />
            </form>
          </Card.Body>
        </Col>
      </div>
    );
  };

  render() {
    return (
      <Dashboard title="Dados Comércio">
        {this.state ? this.renderCommerceDisabled() : <Spinner animation="border" variant="primary" />}
      </Dashboard>
    );
  }
}

export default ViewCommerce;
