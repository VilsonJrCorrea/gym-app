import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const AddListInListButton = ({ name, label, onNew }) => {
  return (
    <Container>
      <Container>
        <Row style={{ paddingTop: '50px' }}>
          <Col style={{ widht: '100%', paddingTop: '35px' }}>
            <button onClick={onNew} className="btn btn-primary" type="submit" name={name}>
              {label}
            </button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AddListInListButton;
