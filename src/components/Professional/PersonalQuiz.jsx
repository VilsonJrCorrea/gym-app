/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Input from '../common/form/Input';

const PersonalQuiz = ({ onChange, data, errors, disabled }) => {
  return (
    <Container>
      <Container>
        <Input
          name="nome"
          type="text"
          disabled={disabled}
          value={data.nome}
          error={errors.nome}
          onChange={onChange}
          label="Nome"
        />
        <Input
          name="cpf"
          type="text"
          disabled={disabled}
          value={data.cpf}
          error={errors.cpf}
          onChange={onChange}
          label="CPF"
        />
      </Container>
    </Container>
  );
};
export default PersonalQuiz;
