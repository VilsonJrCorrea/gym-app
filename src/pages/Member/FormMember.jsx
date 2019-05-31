/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import Joi from "joi-browser";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Input from "../../components/common/form/Input";
import { getMember, saveMember } from "../../services/memberService";
import cleanMember from "../../utils/objects/member";
import getSchema from "../../validators/member";
import Dashboard from '../../components/Layout/Dashboard';

class FormMember extends React.Component {
  schema = getSchema();

  async componentDidMount() {
    await this.initState();
  }

  handleSubmit = async event => {
    try {
      event.preventDefault();
      const { member } = this.state.data;
      const { status } = await saveMember(member);
      if (status === 200) {
        toast.success("Salvo com sucesso!");
        this.props.history.push("/member");
      }else{
        toast.error("Erro ao salvar!");
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
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
    const { member } = { ...this.state.data };
    member[input.name] = input.value;
    this.setState({ member, errors });
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validateForm = () => {
    const options = { abortEarly: false };
    const { member } = { ...this.state.data };
    delete member.questionario;
    delete member.atividades;
    delete member.mensalidades;
    const { error } = Joi.validate(member, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (const item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  async initState() {
    try {
      const { id } = this.props.match.params;
      if (id === 'new') {
        this.setState({ data: { member: cleanMember }, errors: {} });
      } else {
        const { data: saveMember } = await getMember(id);
        this.setState({ data: { member: saveMember }, errors: {} });
      }
    } catch (e) {
      console.log(e);
    }
  }

  renderMemberEnabled = () => {
    const { member } = this.state.data;
    const { errors } = this.state;
    return (
      <div>
        <Col md={{ span: 12, offset: 0 }}>
          <Card.Body>
            <form onSubmit={this.handleSubmit}>
              <Input name="nome" type="text" value={member.nome} error={errors.nome} onChange={this.handleChange} label="Nome" />
              <Input name="email" type="text" value={member.email} error={errors.email} onChange={this.handleChange} label="E-mail" />
              <Row>
                <Col>
                  <Input name="fone" type="text" value={member.fone} error={errors.fone} onChange={this.handleChange} label="Telefone" />
                </Col>
                <Col>
                  <Input name="celular" type="text" value={member.celular} error={errors.celular} onChange={this.handleChange} label="Celular" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input name="dataNascimento" type="text" value={member.dataNascimento} error={errors.dataNascimento}
                    onChange={this.handleChange}
                    label="Data nascimento" />
                </Col>
                <Col>
                  <Input name="sexo" type="text" value={member.sexo} error={errors.sexo} onChange={this.handleChange} label="Sexo" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input name="cidade" type="text" value={member.cidade} error={errors.cidade} onChange={this.handleChange} label="Cidade" />
                </Col>
                <Col>
                  <Input name="uf" type="text" value={member.uf} error={errors.uf} onChange={this.handleChange} label="UF" />
                </Col>
                <Col>
                  <Input name="cep" type="text" value={member.cep} error={errors.cep} onChange={this.handleChange} label="CEP" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input name="rua" type="text" value={member.rua} error={errors.rua} onChange={this.handleChange} label="Rua" />
                </Col>
                <Col>
                  <Input name="numero" type="text" value={member.numero} error={errors.numero} onChange={this.handleChange} label="Número" />
                </Col>
                <Col>
                  <Input name="bairro" type="text" value={member.bairro} error={errors.bairro} onChange={this.handleChange} label="Bairro" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <button
                    disabled={this.validateForm()}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Registrar
                  </button>
                </Col>
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
        {this.state !== null ? this.renderMemberEnabled() : <Spinner animation="border" variant="primary" />}
      </Dashboard>
    );
  }
}
export default FormMember;
