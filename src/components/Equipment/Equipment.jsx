import React from 'react';
import Input from '../common/form/Input';

const Equipment = ({ disabled, data, errors, onChange }) => {
  return (
    <div>
      <Input
        name="nome"
        type="text"
        disabled={disabled}
        error={errors.nome}
        value={data.nome}
        onChange={onChange}
        label="Nome"
      />
      <Input
        name="quantidade"
        type="text"
        disabled={disabled}
        value={data.quantidade}
        onChange={onChange}
        label="Quantidade"
      />
      <Input name="preco" type="text" disabled={disabled} value={data.preco} onChange={onChange} label="Preço" />
    </div>
  );
};

export default Equipment;
