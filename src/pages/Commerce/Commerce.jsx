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

import { getCommerces, deleteCommerce } from '../../services/commerceService';
import 'bootstrap/dist/css/bootstrap.css';

class Commerce extends React.Component {
  state = {
    commerces: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: '',
    sortColumn: { path: 'nome', order: 'asc' }
  };

  columns = [
    {
      path: 'nome',
      label: 'Nome',
      content: datum => <Link to={`/commerce/view/${datum._id}`}>{datum.nome}</Link>
    },
    {
      key: 'delete',
      content: datum => (
        <Link to="/commerce" onClick={() => this.handleDelete(datum)}>
          {<Delete />}
        </Link>
      )
    },
    {
      key: 'update',
      content: datum => <Link to={`/commerce/${datum._id}`}>{<Update />}</Link>
    }
  ];

  async componentDidMount() {
    const { data } = await getCommerces();
    this.setState({ commerces: data });
  }

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, searchQuery, commerces: allCommerces } = this.state;

    let filtered = allCommerces;
    if (searchQuery) {
      filtered = allCommerces.filter(commerce => commerce.nome.toLowerCase().startsWith(searchQuery.toLowerCase()));
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
      await deleteCommerce(aluno._id);
      const { commerces } = this.state;
      const newCommerces = commerces.filter(a => a._id !== aluno._id);
      this.setState({ commerces: newCommerces });
      toast.success('Deletado com sucesso!');
    } catch (error) {
      toast.error('Esse comércio já foi deletado');
      console.log(error);
    }
  };

  render() {
    const { pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, data: commerces } = this.getPagedData();
    return (
      <Dashboard title="Comércios">
        <Row style={{ paddingTop: '25px', paddingBottom: '25px' }}>
          <Col>
            <Link to="/commerce/new">
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
            onDelete={this.handleDelete}
            onUpdate={this.handleModalUpdate}
            data={commerces}
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

export default Commerce;
