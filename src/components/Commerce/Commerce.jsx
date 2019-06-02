import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Object from '../common/form/Object';
import fieldsProducts from '../../utils/constants/produto';
import generateId from '../../utils/generateId';
import removeLastPositionOfList from '../../utils/removeLastPositionOfList';
import AddListInListButton from '../common/buttons/AddInListButton';
import CustomTable from '../common/table/CustomTable';

const Commerce = ({ data, onDelete, onNew, renderInputs, onChangeListOfObjects, disabled }) => {
  let columns = [
    {
      path: 'descricao',
      label: 'Descrição'
    },
    {
      path: 'preco',
      label: 'Preço'
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
  console.log(data);
  data = generateId(data);
  const dataWithoutLastPosition = removeLastPositionOfList(data);
  if (disabled) {
    columns = removeLastPositionOfList(columns);
  }
  return (
    <Container className="container-fluid" style={{ paddingTop: '75px' }}>
      <Row>
        <Col>
          <h3>Produtos</h3>
        </Col>
      </Row>
      {renderInputs ? (
        <div>
          <Object
            list={fieldsProducts}
            name="produtos"
            object={data[data.length - 1]}
            index={data.length - 1}
            onChangeListOfObjects={onChangeListOfObjects}
            disabled={disabled}
          />
          <AddListInListButton onNew={onNew} name="produtos" label="Salvar" />
        </div>
      ) : null}

      <Row>
        <div className="container-fluid col-12" style={{ paddingTop: '50px' }}>
          {data.length > 1 ? <CustomTable columns={columns} data={dataWithoutLastPosition} /> : null}
        </div>
      </Row>
    </Container>
  );
};
export default Commerce;
