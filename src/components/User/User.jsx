import React from 'react';
import Input from '../common/form/Input';

const User = ({ disabled, data, errors, onChange }) => {
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
        name="login"
        type="text"
        disabled={disabled}
        value={data.login}
        onChange={onChange}
        label="Login"
      />
      <Input 
        name="senha" 
        type="password" 
        disabled={disabled} 
        value={data.senha} 
        onChange={onChange} 
        label="Senha" 
      />
    </div>
  );
};

export default User;
