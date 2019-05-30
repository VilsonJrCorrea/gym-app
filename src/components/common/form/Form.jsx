import React, { Component } from "react";
import Joi from "joi-browser";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Input from "./Input";
import InputState from "./InputState";
import SelectAndInput from "./SelectAndInput";
import Select from "./Select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  handleSubmit = event => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit(event);
  };

  // handleChange = ({ currentTarget: input }) => {
  //   const errors = { ...this.state.errors };
  //   const errorMessage = this.validateProperty(input);
  //   if (errorMessage) errors[input.name] = errorMessage;
  //   else delete errors[input.name];

  //   const data = { ...this.state.data };
  //   data[input.name] = input.value;
  //   this.setState({ data, errors });
  // };

  handleChangeListOfObjects = ({ currentTarget: input }) => {
    const [section, field, index] = input.name.split("_");
    // eslint-disable-next-line react/destructuring-assignment
    const { [section]: objectSection } = this.state.data;
    const obj = objectSection[index];
    obj[field] = input.value;
    objectSection[index] = obj;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ section: objectSection });
  };

  // validate = () => {
  //   const options = { abortEarly: false };
  //   // eslint-disable-next-line react/destructuring-assignment
  //   const dadosAlunos = { ...this.state.data };
  //   delete dadosAlunos.questionario;
  //   delete dadosAlunos.atividades;
  //   delete dadosAlunos.mensalidades;
  //   const { error } = Joi.validate(dadosAlunos, this.schema, options);
  //   if (!error) return null;
  //   const errors = {};
  //   // eslint-disable-next-line no-restricted-syntax
  //   for (const item of error.details) errors[item.path[0]] = item.message;
  //   return errors;
  // };

  // validateProperty = ({ name, value }) => {
  //   const obj = { [name]: value };
  //   const schema = { [name]: this.schema[name] };
  //   const { error } = Joi.validate(obj, schema);
  //   return error ? error.details[0].message : null;
  // };

  renderInput(name, label, onChange, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        value={data[name]}
        label={label}
        onChange={onChange}
        error={errors[name]}
      />
    );
  }

  renderDisabledInput(name, label, value, type = "text") {
    const { errors } = this.state;
    return (
      <Input
        name={name}
        disabled
        type={type}
        value={value}
        label={label}
        error={errors[name]}
      />
    );
  }

  renderList(name, label, list) {
    const { data, errors } = this.state;
    return (
      <InputState
        name={name}
        value={data[name]}
        label={label}
        list={list}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelectAndInput(
    label,
    name,
    fieldSelect,
    fieldDesc,
    listOptions,
    onChange
  ) {
    return (
      <SelectAndInput
        label={label}
        name={name}
        fieldSelect={fieldSelect}
        fieldDesc={fieldDesc}
        listOptions={listOptions}
        onChange={onChange}
      />
    );
  }

  renderSelect(label, name, fieldSelect, listOptions, onChange) {
    return (
      <Select
        label={label}
        name={name}
        fieldSelect={fieldSelect}
        listOptions={listOptions}
        onChange={onChange}
      />
    );
  }

  renderH3(label) {
    return (
      <div>
        <h3>{label}</h3>
      </div>
    );
  }

  renderH5(label) {
    return (
      <div style={{ paddingTop: "50px" }}>
        <h5>{label}</h5>
      </div>
    );
  }

  renderListOfQuestions(list, name, options, onChange, onRenderSelect) {
    return list.map(item => (
      <div
        key={item.path}
        style={{ paddingTop: "20px" }}
        className="container col-3"
      >
        <Col>
          {onRenderSelect(item.label, name, item.path, options, onChange)}
        </Col>
      </div>
    ));
  }

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderObject(
    list,
    name,
    object,
    index,
    onRenderField,
    onChangeListOfObjects,
    button
  ) {
    return (
      <div style={{ paddingTop: "20px" }} className="container col-12">
        <Row>
          {list.map(item => (
            <Col key={item.path}>
              {onRenderField(item, name, index, object, onChangeListOfObjects)}
            </Col>
          ))}
          {button ? <Col>{button}</Col> : null}
        </Row>
      </div>
    );
  }

  renderField(item, name, index, object, onChangeListOfObjects) {
    const value = object[item.path];
    const select = `${name  }_${  item.path  }_${  index}`;
    return (
      <div>
        <label htmlFor={item.path}>{item.label}</label>
        <input
          onChange={onChangeListOfObjects}
          name={select}
          value={value}
          className="form-control"
          id={item.path}
        />
      </div>
    );
  }
}

export default Form;
