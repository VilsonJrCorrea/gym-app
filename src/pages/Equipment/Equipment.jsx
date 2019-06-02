import React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dashboard from '../../components/Layout/Dashboard';
import CustomTable from '../../components/common/table/CustomTable';
import Delete from '../../components/common/table/Delete';
import Update from '../../components/common/table/Update';
import Search from '../../components/common/search/Search';
import Pagination from '../../components/common/pagination/Pagination';
import paginate from '../../utils/paginate';

import { getEquipments, deleteEquipment } from '../../services/equipmentService';
import 'bootstrap/dist/css/bootstrap.css';

class Equipment extends React.Component {
  state = {
    equipments: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: '',
    sortColumn: { path: 'nome', order: 'asc' }
  };

  columns = [
    {
      path: 'nome',
      label: 'Nome',
      content: datum => <Link to={`/equipment/view/${datum._id}`}>{datum.nome}</Link>
    },
    {
      path: 'quantidade',
      label: 'Quantidade'
    },
    {
      path: 'preco',
      label: 'Preço'
    },
    {
      key: 'delete',
      content: datum => (
        <Link to="/equipment" onClick={() => this.handleDelete(datum)}>
          {<Delete />}
        </Link>
      )
    },
    {
      key: 'update',
      content: datum => <Link to={`/equipment/${datum._id}`}>{<Update />}</Link>
    }
  ];

  async componentDidMount() {
    const { data } = await getEquipments();
    this.setState({ equipments: data });
  }

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, searchQuery, equipments: allEquipments } = this.state;

    let filtered = allEquipments;
    if (searchQuery) {
      filtered = allEquipments.filter(equipment => equipment.nome.toLowerCase().startsWith(searchQuery.toLowerCase()));
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const alunos = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: alunos };
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleDelete = async aluno => {
    try {
      await deleteEquipment(aluno._id);
      const { equipments } = this.state;
      const newEquipments = equipments.filter(a => a._id !== aluno._id);
      this.setState({ equipments: newEquipments });
      toast.success('Deletado com sucesso!');
    } catch (error) {
      toast.error('Esse equipamento já foi deletado');
      console.log(error);
    }
  };

  render() {
    // const count = this.state.equipments.length;
    const { pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, data: equipments } = this.getPagedData();
    return (
      <Dashboard title="Equipamentos">
        <Row style={{ paddingTop: '25px', paddingBottom: '25px' }}>
          <Col>
            <Link to="/equipment/new">
              <Button variant="primary">Novo</Button>
            </Link>
          </Col>
          <Col>
            <Search value={searchQuery} onChange={this.handleSearch} />
          </Col>
        </Row>
        <Row>
          <CustomTable
            columns={this.columns}
            onModalChange={this.handleModalOneChange}
            onDelete={this.handleDelete}
            onUpdate={this.handleModalUpdate}
            data={equipments}
          />
        </Row>
        <Row>
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </Row>
      </Dashboard>
    );
  }
}

export default Equipment;
