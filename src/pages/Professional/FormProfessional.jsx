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
import { getProfessional, saveProfessional } from '../../services/professionalService';
import { getMembers } from '../../services/memberService';
import cleanProfessional from '../../utils/objects/profissional';
import getSchema from '../../validators/professional';
import Dashboard from '../../components/Layout/Dashboard';
import Professional from '../../components/Professional/Professional';
import MemberOfProfessional from './MemberOfProfessional';
import SubmitButton from '../../components/common/buttons/SubmitButton';

class FormProfessional extends React.Component {
  schema = getSchema();

  async componentDidMount() {
    await this.initState();
  }

  handleSubmit = async event => {
    try {
      event.preventDefault();
      const { professional } = this.state.data;
      console.log('************>', this.state.data);
      const { status } = await saveProfessional(professional);
      if (status === 200) {
        toast.success('Salvo com sucesso!');
        this.props.history.push('/professional');
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
    const { professional } = { ...this.state.data };
    professional[input.name] = input.value;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ professional, errors });
  };

  handleConnect=async member=>{
    const {alunos}={...this.state.data.professional};
    const result =alunos.filter(a => a._id === member._id);
    if(result.length > 0){
      const p=_.remove(alunos,(n,i)=>{
        return n._id===member._id;
      })
      this.setState({p});
    }else{
      alunos.push(member);
      this.setState({alunos});
    }
  }

  handleDeleteMember = e => {
    e.preventDefault();
    const { currentTarget } = e;
    const field = currentTarget.name;
    const { alunos } = { ...this.state.data.professional };
    const p = _.remove(alunos, (n, i) => {
      // eslint-disable-next-line eqeqeq
      return i == field;
    });
    this.setState({ p });
  };


  renderButtonConnect=member=>{
    const {alunos}={...this.state.data.professional};
    const result =alunos.filter(a => a._id === member._id);
    if(result.length>0){
      return result;
    }
    return null;
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validateForm = () => {
    const options = { abortEarly: false };
    const { professional } = { ...this.state.data };
    const { error } = Joi.validate(professional, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (const item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  async initState() {
    try {
      const { id } = this.props.match.params;
      const { data: members } = await getMembers();
      if (id === 'new') {
        const auxCleanProfessional = _.cloneDeep(cleanProfessional);
        this.setState({ data: { professional: auxCleanProfessional, members }, errors: {} });
      } else {
        const { data: saveProfessional } = await getProfessional(id);
        this.setState({ data: { professional: saveProfessional, members }, errors: {} });
      }

    } catch (e) {
      console.log(e);
    }
  }

  renderProfessionalEnabled = () => {
    const { professional } = this.state.data;
    const { errors } = this.state;
    return (
      <div>
        <Col md={{ span: 12, offset: 0 }}>
          <Card.Body>
            <form onSubmit={this.handleSubmit}>
              <Professional
                data={professional}
                errors={errors}
                onChange={this.handleChange}
                onDelete={this.handleDeleteMember}
              />
              <MemberOfProfessional
                onConnect={this.handleConnect}
                onRenderConnect={this.renderButtonConnect}
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
      <Dashboard title="Dados Profissional">
        {this.state !== null ? this.renderProfessionalEnabled() : <Spinner animation="border" variant="primary" />}
      </Dashboard>
    );
  }
}
export default FormProfessional;
