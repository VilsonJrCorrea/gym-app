/* eslint-disable react/prop-types */
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import SelectAndInput from '../common/form/SelectAndInput';
import ListSelect from '../common/form/ListSelect';
import { motivos, comoConheceu, naoSim } from '../../utils/constants/questionario';

const GeneralQuiz = ({ onChange, disabled }) => {
  return (
    <Container className="container-fluid" style={{ paddingTop: '50px' }}>
      <Row>
        <Col>
          <h3>Questionário</h3>
        </Col>
      </Row>
      <Container>
        <Row>
          <Col>
            <SelectAndInput
              label="Plano saúde"
              name="planoSaude"
              fieldSelect="possui"
              fieldDesc="descricao"
              listOptions={naoSim}
              onChange={onChange}
              disabled={disabled}
            />
          </Col>
          <Col>
            <SelectAndInput
              label="Outro esporte"
              name="outroEsporte"
              fieldSelect="pratica"
              fieldDesc="descricao"
              listOptions={naoSim}
              onChange={onChange}
              disabled={disabled}
            />
          </Col>
        </Row>
      </Container>
      <ListSelect
        label="Motivos"
        name="motivos"
        list={motivos}
        listOptions={naoSim}
        onChange={onChange}
        disabled={disabled}
      />
      <ListSelect
        label="Como conheceu a academia"
        name="comoConheceuAcademia"
        list={comoConheceu}
        listOptions={naoSim}
        onChange={onChange}
        disabled={disabled}
      />
    </Container>
  );
};
export default GeneralQuiz;
