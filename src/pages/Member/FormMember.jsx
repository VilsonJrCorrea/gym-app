/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from "react";
import Joi from "joi-browser";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Input from "../../components/common/form/Input";
import { getMember } from "../../services/memberService";
import cleanMember from "../../utils/objects/member";
import getSchema from "../../validators/member";
import Dashboard from '../../components/Layout/Dashboard';

class FormMember extends React.Component {

  state:{
    data:{
      member:cleanMember,
    },
    errors: {}
  };

  schema = getSchema();

  async componentDidMount(){
    await this.init();
  }

  doSubmit = event => {
    try {
      event.preventDefault();
      console.log(this.state.member);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const errors = { ...this.state.errors };
        errors.username = e.response.data;
        this.setState({ errors });
      }
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    console.log(this.state);
    // eslint-disable-next-line react/no-access-state-in-setstate
    const member = { ...this.state.member };
    member[input.name] = input.value;
    this.setState({ member, errors });
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  async init(){
    try{
      // eslint-disable-next-line react/destructuring-assignment
      const {id}= this.props.match.params;
      if(id==='new')return;
      const {data:saveMember}=await getMember(id);
      this.setState({member:saveMember});
    }catch(e){
      console.log(e);
    }
  }

  renderMemberDisabled=member=>{
    return (
      <div>
        <Col md={{ span: 12, offset: 0 }}>
          <Card.Body>
            {/* <form onSubmit={this.handleSubmit}>
              {this.renderDisabledInput("nome", "Nome", member.nome)}
              {this.renderDisabledInput("email", "E-mail", member.email)}
              <Row>
                <Col>{this.renderDisabledInput("fone", "Telefone", member.fone)}</Col>
                <Col>{this.renderDisabledInput("celular", "Celular", member.celular)} </Col>
              </Row>
              <Row>
                <Col>{this.renderDisabledInput("dataNascimento", "Data nascimento", member.dataNascimento)}</Col>
                <Col>{this.renderDisabledInput("sexo", "Sexo", member.sexo)}</Col>
              </Row>
              <Row>
                <Col>{this.renderDisabledInput("cidade", "Cidade", member.cidade)}</Col>
                <Col>{this.renderDisabledInput("uf", "UF", member.uf)}</Col>
                <Col>{this.renderDisabledInput("cep", "CEP", member.cep)}</Col>
              </Row>
              <Row>
                <Col>{this.renderDisabledInput("rua", "Rua", member.rua)}</Col>
                <Col>{this.renderDisabledInput("numero", "Número", member.numero)}</Col>
                <Col>{this.renderDisabledInput("bairro", "Bairro", member.bairro)}</Col>
              </Row>
            </form> */}
          </Card.Body>
        </Col>
      </div>
    );
  }

  renderMemberEnabled=()=>{
    console.log(this.state);
    return (
      <div>
        <Col md={{ span: 12, offset: 0 }}>
          <Card.Body>
            <form onSubmit={this.handleSubmit}>
              <Input
                name="nome"
                type="text"
                value={this.state.member.nome}
                label="Nome"
                onChange={this.handleChange}
                error={this.state.errors.name}
              />
              {/* {this.renderInput("nome", "Nome",this.handleChange)}
              {this.renderInput("email", "E-mail",this.handleChange)}
              <Row>
                <Col>{this.renderInput("fone", "Telefone",this.handleChange)}</Col>
                <Col>{this.renderInput("celular", "Celular",this.handleChange)} </Col>
              </Row>
              <Row>
                <Col>{this.renderInput("dataNascimento", "Data nascimento",this.handleChange)}</Col>
                <Col>{this.renderInput("sexo", "Sexo")}</Col>
              </Row>
              <Row>
                <Col>{this.renderInput("cidade", "Cidade",this.handleChange)}</Col>
                <Col>{this.renderInput("uf", "UF",this.handleChange)}</Col>
                <Col>{this.renderInput("cep", "CEP",this.handleChange)}</Col>
              </Row>
              <Row>
                <Col>{this.renderInput("rua", "Rua",this.handleChange)}</Col>
                <Col>{this.renderInput("numero", "Número",this.handleChange)}</Col>
                <Col>{this.renderInput("bairro", "Bairro",this.handleChange)}</Col>
              </Row> */}
              <Row>
                {this.renderButton("Registrar")}
              </Row>
            </form>
          </Card.Body>
        </Col>
      </div>
    );
  }

  render() {
    console.log(this.state);
    // const { member } = this.state;
    return (
      <Dashboard title="Dados aluno">
        {this.state?<h1>Ola</h1>:<h3>Cu</h3>}
        {/* {member? this.renderMemberDisabled(member)
          : this.renderMemberEnabled()} */}
      </Dashboard>
    );
  }
};

export default FormMember;
