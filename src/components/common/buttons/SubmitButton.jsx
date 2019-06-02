import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const SubmitButton = ({ onValidate }) => {
  return (
    <Container>
      <Container>
        <Row style={{ paddingTop: '50px' }}>
          <Col>
            <button disabled={onValidate()} type="submit" className="btn btn-primary">
              Registrar
            </button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default SubmitButton;
