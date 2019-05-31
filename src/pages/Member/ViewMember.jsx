/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Input from "../../components/common/form/Input";
import { getMember } from "../../services/memberService";
import cleanMember from "../../utils/objects/member";
import getSchema from "../../validators/member";
import Dashboard from '../../components/Layout/Dashboard';

class ViewMember extends React.Component {

  state:{
    member:cleanMember,
    errors: {}
  };

  schema = getSchema();

  async componentDidMount(){
    await this.getDatum();
  }

  async getDatum(){
    try{
      const {id}= this.props.match.params;
      const {data:memberSaved}=await getMember(id);
      this.setState({member:memberSaved});
    }catch(e){
      console.log(e);
    }
  }

  renderMemberDisabled=()=>{
    const {member} = this.state;
    return (
      <div>
        <Col md={{ span: 12, offset: 0 }}>
          <Card.Body>
            <form onSubmit={this.handleSubmit}>
              <Input name="nome" disabled type="text" value={member.nome} label="Nome"/>
              <Input name="email" disabled type="text" value={member.email} label="E-mail"/>
              <Row>
                <Col><Input name="fone" disabled type="text" value={member.fone} label="Telefone"/></Col>
                <Col><Input name="celular" disabled type="text" value={member.celular} label="Celular"/></Col>
              </Row>
              <Row>
                <Col><Input name="dataNascimento" disabled type="text" value={member.dataNascimento} label="Data nascimento"/></Col>
                <Col><Input name="sexo" disabled type="text" value={member.sexo} label="Sexo"/></Col>
              </Row>
              <Row>
                <Col><Input name="cidade" disabled type="text" value={member.cidade} label="Cidade"/></Col>
                <Col><Input name="uf" disabled type="text" value={member.uf} label="UF"/></Col>
                <Col><Input name="cep" disabled type="text" value={member.cep} label="CEP"/></Col>
              </Row>
              <Row>
                <Col><Input name="rua" disabled type="text" value={member.rua} label="Rua"/></Col>
                <Col><Input name="numero" disabled type="text" value={member.numero} label="Número"/></Col>
                <Col><Input name="bairro" disabled type="text" value={member.bairro} label="Bairro"/></Col>
              </Row>
            </form>
          </Card.Body>
        </Col>
      </div>
    );
  }

  render() {
    return (
      <Dashboard title="Dados aluno">
        {this.state ? this.renderMemberDisabled()
          : <Spinner animation="border" variant="primary"/>}
      </Dashboard>
    );
  }
};

export default ViewMember;
