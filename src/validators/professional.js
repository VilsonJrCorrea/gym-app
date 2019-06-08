/* eslint-disable prettier/prettier */
import Joi from 'joi-browser';

const minimo = 'O minimo é ';
const maximo = ' O máximo é ';
const vazio = 'Não pode ser vazio';

export default function getSchema() {
  return {
    _id: Joi.any(),
    nome: Joi.string()
      .required()
      .min(5)
      .max(50)
      .error(errors => {
        return errors.map(err => {
          switch (err.type) {
            case 'string.min':
              return { message: `${minimo} 5` };
            case 'any.empty':
              return { message: vazio };
            case 'string.max':
              return { message: `${maximo} 50` };
            default:
              return {};
          }
        });
      }),
    cpf: Joi.string()
      .required()
      .min(5)
      .max(50)
      .error(errors => {
        return errors.map(err => {
          switch (err.type) {
            case 'string.min':
              return { message: `${minimo} 5` };
            case 'any.empty':
              return { message: vazio };
            case 'string.max':
              return { message: `${maximo} 50` };
            default:
              return {};
          }
        });
      }),
    alunos: Joi.any(),
    __v: Joi.number()
  };
}
