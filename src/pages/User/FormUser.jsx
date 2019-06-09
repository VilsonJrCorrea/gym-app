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
import { getUser, saveUser } from '../../services/userService';
import cleanUser from '../../utils/objects/user';
import getSchema from '../../validators/user';
import Dashboard from '../../components/Layout/Dashboard';
import User from '../../components/User/User';
import SubmitButton from '../../components/common/buttons/SubmitButton';

class FormUser extends React.Component {
  schema = getSchema();

  async componentDidMount() {
    await this.initState();
  }

  handleSubmit = async event => {
    try {
      event.preventDefault();
      const { user } = this.state.data;
      console.log('************>', this.state.data);
      const { status } = await saveUser(user);
      if (status === 200) {
        toast.success('Salvo com sucesso!');
        this.props.history.push('/user');
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
    const { user } = { ...this.state.data };
    user[input.name] = input.value;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ user, errors });
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validateForm = () => {
    const options = { abortEarly: false };
    const { user } = { ...this.state.data };
    const { error } = Joi.validate(user, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (const item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  async initState() {
    try {
      const { id } = this.props.match.params;
      if (id === 'new') {
        const auxCleanUser = _.cloneDeep(cleanUser);
        this.setState({ data: { user: auxCleanUser }, errors: {} });
      } else {
        const { data: saveUser } = await getUser(id);
        this.setState({ data: { user: saveUser }, errors: {} });
      }
    } catch (e) {
      console.log(e);
    }
  }

  renderUserEnabled = () => {
    const { user } = this.state.data;
    const { errors } = this.state;
    return (
      <div>
        <Col md={{ span: 12, offset: 0 }}>
          <Card.Body>
            <form onSubmit={this.handleSubmit}>
              <User data={user} errors={errors} onChange={this.handleChange} />
              <SubmitButton onValidate={this.validateForm} />
            </form>
          </Card.Body>
        </Col>
      </div>
    );
  };

  render() {
    return (
      <Dashboard title="Dados Usuário">
        {this.state !== null ? this.renderUserEnabled() : <Spinner animation="border" variant="primary" />}
      </Dashboard>
    );
  }
}
export default FormUser;
