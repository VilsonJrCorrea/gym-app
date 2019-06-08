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

import { getProfessionals, deleteProfessional } from '../../services/professionalService';
import 'bootstrap/dist/css/bootstrap.css';

class Professional extends React.Component {
  state = {
    professionals: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: '',
    sortColumn: { path: 'nome', order: 'asc' }
  };

  columns = [
    {
      path: 'nome',
      label: 'Nome',
      content: datum => <Link to={`/professional/view/${datum._id}`}>{datum.nome}</Link>
    },
    {
      path: 'cpf',
      label: 'CPF'
    },
    {
      path: 'alunos.length',
      label: 'Alunos'
    },
    {
      key: 'delete',
      content: datum => (
        <Link to="/professional" onClick={() => this.handleDelete(datum)}>
          {<Delete />}
        </Link>
      )
    },
    {
      key: 'update',
      content: datum => <Link to={`/professional/${datum._id}`}>{<Update />}</Link>
    }
  ];

  async componentDidMount() {
    const { data } = await getProfessionals();
    this.setState({ professionals: data });
  }

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, searchQuery, professionals: allProfessionals } = this.state;

    let filtered = allProfessionals;
    if (searchQuery) {
      filtered = allProfessionals.filter(professional =>
        professional.nome.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
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

  handleDelete = async professional => {
    try {
      const { status } = await deleteProfessional(professional._id);
      if (status === 200) {
        const { professionals } = this.state;
        const newProfessionals = professionals.filter(a => a._id !== professional._id);
        this.setState({ professionals: newProfessionals });
        toast.success('Deletado com sucesso!');
      } else {
        toast.error('Falha ao deletar');
      }
    } catch (error) {
      toast.error('Esse profissional já foi deletado');
      console.log(error);
    }
  };

  render() {
    // const count = this.state.professionals.length;
    const { pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, data: professionals } = this.getPagedData();
    return (
      <Dashboard title="Professionais">
        <Row style={{ paddingTop: '25px', paddingBottom: '25px' }}>
          <Col>
            <Link to="/professional/new">
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
            data={professionals}
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

export default Professional;
