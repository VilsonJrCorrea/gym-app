/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import Joi from 'joi-browser';
import _ from 'lodash';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { getCommerce, saveCommerce } from '../../services/commerceService';
import cleanProduct from '../../utils/objects/produto';
import cleanCommerce from '../../utils/objects/comercio';
import getSchema from '../../validators/commerce';
import Dashboard from '../../components/Layout/Dashboard';
import Commerce from '../../components/Commerce/Commerce';
import SubmitButton from '../../components/common/buttons/SubmitButton';
import Input from '../../components/common/form/Input';

class FormCommerce extends React.Component {
  schema = getSchema();

  async componentDidMount() {
    await this.initState();
  }

  handleSubmit = async event => {
    try {
      event.preventDefault();
      const { commerce } = this.state.data;
      const { status } = await saveCommerce(commerce);
      if (status === 200) {
        toast.success('Salvo com sucesso!');
        this.props.history.push('/commerce');
      } else {
        toast.error('Erro ao salvar!');
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
    const { commerce } = { ...this.state.data };
    commerce[input.name] = input.value;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ commerce, errors });
  };

  handleChangeQuestionario = ({ currentTarget: input }) => {
    const [section, field] = input.name.split('_');
    const objectSection = this.state.data.commerce.questionario[section];
    objectSection[field] = input.value;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ objectSection });
  };

  handleChangeListOfObjects = ({ currentTarget: input }) => {
    const [section, field, index] = input.name.split('_');
    const { [section]: objectSection } = this.state.data.commerce;
    const obj = objectSection[index];
    obj[field] = input.value;
    objectSection[index] = obj;
    this.setState({ section: objectSection });
  };

  handleNewItemOnListProduct = e => {
    e.preventDefault();
    const { currentTarget } = e;
    const field = currentTarget.name;
    const { [field]: d } = { ...this.state.data.commerce };
    const { commerce } = { ...this.state.data };
    const auxCleanProduct = _.cloneDeep(cleanProduct);
    commerce[field] = _.concat(d, auxCleanProduct);
    this.setState({ commerce });
  };

  handleDeleteProduct = e => {
    e.preventDefault();
    const { currentTarget } = e;
    const field = currentTarget.name;
    const { produtos } = { ...this.state.data.commerce };
    const p = _.remove(produtos, (n, i) => {
      // eslint-disable-next-line eqeqeq
      return i == field;
    });
    this.setState({ p });
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validateForm = () => {
    const options = { abortEarly: false };
    const { commerce } = { ...this.state.data };
    const { error } = Joi.validate(commerce, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (const item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  async initState() {
    try {
      const { id } = this.props.match.params;
      if (id === 'new') {
        const auxCleanCommerce = _.cloneDeep(cleanCommerce);
        this.setState({ data: { commerce: auxCleanCommerce }, errors: {} });
      } else {
        const { data: saveCommerce } = await getCommerce(id);
        this.setState({ data: { commerce: saveCommerce }, errors: {} });
      }
    } catch (e) {
      console.log(e);
    }
  }

  renderCommerceEnabled = () => {
    const { commerce } = this.state.data;
    const { produtos } = commerce;
    const { errors } = this.state;
    return (
      <div>
        <Col md={{ span: 12, offset: 0 }}>
          <Card.Body>
            <form onSubmit={this.handleSubmit}>
              <Input
                name="nome"
                type="text"
                value={commerce.nome}
                label="Nome"
                error={errors.nome}
                onChange={this.handleChange}
              />
              <Commerce
                onChangeListOfObjects={this.handleChangeListOfObjects}
                data={produtos}
                onNew={this.handleNewItemOnListProduct}
                onDelete={this.handleDeleteProduct}
                renderInputs
              />
              <SubmitButton onValidate={this.validateForm} />
            </form>
          </Card.Body>
        </Col>
      </div>
    );
  };

  render() {
    return (
      <Dashboard title="Dados comércio">
        {this.state !== null ? this.renderCommerceEnabled() : <Spinner animation="border" variant="primary" />}
      </Dashboard>
    );
  }
}
export default FormCommerce;
