/* eslint-disable prettier/prettier */
import Joi from 'joi-browser';

const minimo = 'O minimo é ';
const maximo = ' O máximo é ';
const vazio = 'Não pode ser vazio';

export default function getSchema() {
  return {
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
    dataNascimento: Joi.string()
      .min(6)
      .max(10)
      .required()
      .error(errors => {
        return errors.map(err => {
          switch (err.type) {
            case 'string.min':
              return { message: `${minimo} 6` };
            case 'any.empty':
              return { message: vazio };
            case 'string.max':
              return { message: `${maximo} 10` };
            default:
              return {};
          }
        });
      }),
    sexo: Joi.string()
      .required()
      .min(8)
      .max(9)
      .error(errors => {
        return errors.map(err => {
          switch (err.type) {
            case 'string.min':
              return { message: `${minimo} 8` };
            case 'any.empty':
              return { message: vazio };
            case 'string.max':
              return { message: `${maximo} 9` };
            default:
              return {};
          }
        });
      }),
    fone: Joi.string()
      .required()
      .min(8)
      .max(10)
      .error(errors => {
        return errors.map(err => {
          switch (err.type) {
            case 'string.min':
              return { message: `${minimo} 8` };
            case 'any.empty':
              return { message: vazio };
            case 'string.max':
              return { message: `${maximo} 10` };
            default:
              return {};
          }
        });
      }),
    celular: Joi.string()
      .required()
      .min(9)
      .max(12)
      .error(errors => {
        return errors.map(err => {
          switch (err.type) {
            case 'string.min':
              return { message: `${minimo} 9` };
            case 'any.empty':
              return { message: vazio };
            case 'string.max':
              return { message: `${maximo} 12` };
            default:
              return {};
          }
        });
      }),
    email: Joi.string()
      .required()
      .min(8)
      .max(50)
      .error(errors => {
        return errors.map(err => {
          switch (err.type) {
            case 'string.min':
              return { message: `${minimo} 8` };
            case 'any.empty':
              return { message: vazio };
            case 'string.max':
              return { message: `${maximo} 50` };
            default:
              return {};
          }
        });
      }),
    cidade: Joi.string()
      .required()
      .min(3)
      .max(50)
      .error(errors => {
        return errors.map(err => {
          switch (err.type) {
            case 'string.min':
              return { message: `${minimo} 3` };
            case 'any.empty':
              return { message: vazio };
            case 'string.max':
              return { message: `${maximo} 50` };
            default:
              return {};
          }
        });
      }),
    uf: Joi.string()
      .required()
      .min(2)
      .max(50)
      .error(errors => {
        return errors.map(err => {
          switch (err.type) {
            case 'string.min':
              return { message: `${minimo} 2` };
            case 'any.empty':
              return { message: vazio };
            case 'string.max':
              return { message: `${maximo} 50` };
            default:
              return {};
          }
        });
      }),
    cep: Joi.string()
      .required()
      .min(8)
      .max(8)
      .error(errors => {
        return errors.map(err => {
          switch (err.type) {
            case 'string.min':
              return { message: `${minimo} 8` };
            case 'any.empty':
              return { message: vazio };
            case 'string.max':
              return { message: `${maximo} 8` };
            default:
              return {};
          }
        });
      }),
    rua: Joi.string()
      .required()
      .min(3)
      .max(50)
      .error(errors => {
        return errors.map(err => {
          switch (err.type) {
            case 'string.min':
              return { message: `${minimo} 3` };
            case 'any.empty':
              return { message: vazio };
            case 'string.max':
              return { message: `${maximo} 50` };
            default:
              return {};
          }
        });
      }),
    numero: Joi.number()
      .required()
      .min(0)
      .label('Valor invalido'),
    bairro: Joi.string()
      .required()
      .min(3)
      .max(50)
      .error(errors => {
        return errors.map(err => {
          switch (err.type) {
            case 'string.min':
              return { message: `${minimo} 3` };
            case 'any.empty':
              return { message: vazio };
            case 'string.max':
              return { message: `${maximo} 50` };
            default:
              return {};
          }
        });
      }),
    _id: Joi.string(),
    codigoAluno: Joi.string(),
    atividades: Joi.any(),
    questionario: Joi.any(),
    mensalidades: Joi.any(),
    __v: Joi.number()
  };
}
