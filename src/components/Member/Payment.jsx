import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Object from '../common/form/Object';
import fieldsMensalidades from '../../utils/constants/mensalidade';
import generateId from '../../utils/generateId';
import removeLastPositionOfList from '../../utils/removeLastPositionOfList';
import CustomTable from '../common/table/CustomTable';
import AddListInListButton from '../common/buttons/AddInListButton';

const Payment = ({ data, onNew, onChangeListOfObjects, renderInputs }) => {
  const columns = [
    {
      path: 'descricao',
      label: 'Descrição',
      content: datum => datum.descricao
    },
    {
      path: 'vencimento',
      label: 'Vencimento',
      content: datum => datum.vencimento
    },
    {
      path: 'valor',
      label: 'Valor',
      content: datum => datum.valor
    }
  ];
  data = generateId(data);
  const dataWithoutLastPosition = removeLastPositionOfList(data);

  return (
    <Container className="container-fluid" style={{ paddingTop: '75px' }}>
      <Row>
        <Col>
          <h3>Mensalidades</h3>
        </Col>
      </Row>
      {renderInputs ? (
        <div>
          <Object
            list={fieldsMensalidades}
            name="mensalidades"
            object={data[data.length - 1]}
            index={data.length - 1}
            onChangeListOfObjects={onChangeListOfObjects}
          />
          <AddListInListButton onNew={onNew} name="mensalidades" label="Salvar" />
        </div>
      ) : null}
      <Row>
        <div className="container-fluid col-10" style={{ paddingTop: '50px' }}>
          {data.length >= 1 ? <CustomTable columns={columns} data={dataWithoutLastPosition} /> : null}
        </div>
      </Row>
    </Container>
  );
};
export default Payment;
