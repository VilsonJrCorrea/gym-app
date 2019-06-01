/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Input from "../common/form/Input";

const PersonalQuiz = ({
  onChange,
  data,
  errors,
  disabled
}) => {
  return (
    <Container>
      <Container>
        <Input name="nome" type="text" disabled={disabled} value={data.nome} error={errors.nome} onChange={onChange} label="Nome" />
        <Input name="email" type="text" disabled={disabled} value={data.email} error={errors.email} onChange={onChange} label="E-mail" />
        <Row>
          <Col>
            <Input name="fone" type="text" disabled={disabled} value={data.fone} error={errors.fone} onChange={onChange} label="Telefone" />
          </Col>
          <Col>
            <Input name="celular" type="text" disabled={disabled} value={data.celular} error={errors.celular} onChange={onChange} label="Celular" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input name="dataNascimento" type="text" disabled={disabled} value={data.dataNascimento} error={errors.dataNascimento}
              onChange={onChange}
              label="Data nascimento" />
          </Col>
          <Col>
            <Input name="sexo" type="text" disabled={disabled} value={data.sexo} error={errors.sexo} onChange={onChange} label="Sexo" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input name="cidade" type="text" disabled={disabled} value={data.cidade} error={errors.cidade} onChange={onChange} label="Cidade" />
          </Col>
          <Col>
            <Input name="uf" type="text" disabled={disabled} value={data.uf} error={errors.uf} onChange={onChange} label="UF" />
          </Col>
          <Col>
            <Input name="cep" type="text" disabled={disabled} value={data.cep} error={errors.cep} onChange={onChange} label="CEP" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input name="rua" type="text" disabled={disabled} value={data.rua} error={errors.rua} onChange={onChange} label="Rua" />
          </Col>
          <Col>
            <Input name="numero" type="text" disabled={disabled} value={data.numero} error={errors.numero} onChange={onChange} label="Número" />
          </Col>
          <Col>
            <Input name="bairro" type="text" disabled={disabled} value={data.bairro} error={errors.bairro} onChange={onChange} label="Bairro" />
          </Col>
        </Row>
      </Container>
    </Container>
  )
};
export default PersonalQuiz;
