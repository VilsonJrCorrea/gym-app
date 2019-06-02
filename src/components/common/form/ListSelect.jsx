/* eslint-disable react/prop-types */
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Select from './Select';

const ListSelect = ({ label, name, list, listOptions, disabled, onChange }) => {
  return (
    <Container>
      <Row>
        <Col style={{ paddingTop: '75px' }}>
          <h4>{label}</h4>
        </Col>
      </Row>
      <Row>
        {list.map(item => (
          <Col style={{ paddingTop: '20px' }} key={item.path} className="col col-3">
            <Select
              label={item.label}
              name={name}
              fieldSelect={item.path}
              listOptions={listOptions}
              onChange={onChange}
              disabled={disabled}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default ListSelect;
