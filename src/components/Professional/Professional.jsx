import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Object from '../common/form/Object';
import fieldAlunos from '../../utils/constants/aluno';
import generateId from '../../utils/generateId';
import removeLastPositionOfList from '../../utils/removeLastPositionOfList';
import AddListInListButton from '../common/buttons/AddInListButton';
import CustomTable from '../common/table/CustomTable';
import PersonalQuiz from "./PersonalQuiz";

const Professional = ({ data, onChange,onDelete, onNew, renderInputs, onChangeListOfObjects, disabled,errors }) => {
  let columns = [
    {
      path: 'nome',
      label: 'Nome'
    },
    {
      path: 'sexo',
      label: 'Sexo'
    },
    {
      path: 'celular',
      label: 'Celular'
    },
    {
      path: 'email',
      label: 'E-mail'
    },
    {
      key: 'delete',
      content: datum => (
        <button className="btn btn-danger" type="submit" onClick={onDelete}>
          {'Apagar'}
        </button>
      )
    }
  ];
  if (disabled) {
    columns = removeLastPositionOfList(columns);
  }
  return (
    <Container className="container-fluid" style={{ paddingTop: '75px' }}>
      <Row>
        <PersonalQuiz
          data={data}
          errors={errors}
          disabled={disabled}
          onChange={onChange}
        />
      </Row>
      <Row>
        <div className="container-fluid col-12" style={{ paddingTop: '50px' }}>
          {data.alunos.length > 0 ?
            (<>
                <Col>
                  <h3>Alunos orientados pelo profissional</h3>
                </Col>
                <CustomTable columns={columns} data={data.alunos}/></>
            )
            : null}
        </div>
      </Row>
    </Container>
  );
};
export default Professional;
