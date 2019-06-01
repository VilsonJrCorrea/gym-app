/* eslint-disable react/no-unused-state */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import Joi from "joi-browser";
import _ from "lodash";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { getMember, saveMember } from "../../services/memberService";
import cleanMember from "../../utils/objects/member";
import getSchema from "../../validators/member";
import Dashboard from '../../components/Layout/Dashboard';
import PersonalQuiz from "../../components/Member/PersonalQuiz";
import GeneralQuiz from "../../components/Member/GeneralQuiz";
import Payment from "../../components/Member/Payment";
import Activity from "../../components/Member/Activity";
import SubmitButton from "../../components/common/buttons/SubmitButton";
import cleanActivity from "../../utils/objects/atividade";
import cleanPayment from "../../utils/objects/mensalidade";

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
      } else {
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
    // eslint-disable-next-line react/no-unused-state
    this.setState({ member, errors });
  };

  handleChangeQuestionario = ({ currentTarget: input }) => {
    const [section, field] = input.name.split("_");
    const objectSection = this.state.data.member.questionario[section];
    objectSection[field] = input.value;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ objectSection });
  };

  handleChangeListOfObjects = ({ currentTarget: input }) => {
    const [section, field, index] = input.name.split("_");
    const { [section]: objectSection } = this.state.data.member;
    const obj = objectSection[index];
    obj[field] = input.value;
    objectSection[index] = obj;
    this.setState({ section: objectSection });
  };

  handleNewItemOnListPayment = e => {
    e.preventDefault();
    const { currentTarget } = e;
    const field = currentTarget.name;
    const { [field]: d } = { ...this.state.data.member };
    const { member } = { ...this.state.data };
    const auxCleanPayment = _.cloneDeep(cleanPayment);
    member[field] = _.concat(d, auxCleanPayment);
    this.setState({ member });
  };

  handleNewItemOnListActivity = e => {
    e.preventDefault();
    const { currentTarget } = e;
    const field = currentTarget.name;
    const { [field]: d } = { ...this.state.data.member };
    const { member } = { ...this.state.data };
    const auxCleanActivity = _.cloneDeep(cleanActivity);
    member[field] = _.concat(d, auxCleanActivity);
    this.setState({ member });
  };

  handleDeleteActivity = e => {
    e.preventDefault();
    const { currentTarget } = e;
    const field = currentTarget.name;
    const { atividades } = { ...this.state.data.member };
    const p = _.remove(atividades, (n, i) => {
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
    const { member } = { ...this.state.data };
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
        // eslint-disable-next-line no-shadow
        const { data: saveMember } = await getMember(id);
        this.setState({ data: { member: saveMember }, errors: {} });
      }
    } catch (e) {
      console.log(e);
    }
  }

  renderMemberEnabled = () => {
    const { member } = this.state.data;
    const { mensalidades, atividades } = member;
    const { errors } = this.state;
    return (
      <div>
        <Col md={{ span: 12, offset: 0 }}>
          <Card.Body>
            <form onSubmit={this.handleSubmit}>
              <PersonalQuiz
                onChange={this.handleChange}
                data={member}
                errors={errors}
              />
              <GeneralQuiz
                onChange={this.handleChangeQuestionario}
              />
              <Payment
                onChangeListOfObjects={this.handleChangeListOfObjects}
                data={mensalidades}
                onNew={this.handleNewItemOnListPayment}
                renderInputs
              />
              <Activity
                onChangeListOfObjects={this.handleChangeListOfObjects}
                data={atividades}
                onNew={this.handleNewItemOnListActivity}
                onDelete={this.handleDeleteActivity}
                renderInputs
              />
              <SubmitButton
                onValidate={this.validateForm}
              />

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
