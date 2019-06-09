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

import { getUsers, deleteUser } from '../../services/userService';
import './node_modules/bootstrap/dist/css/bootstrap.css';

class User extends React.Component {
  state = {
    users: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: '',
    sortColumn: { path: 'nome', order: 'asc' }
  };

  columns = [
    {
      path: 'nome',
      label: 'Nome',
      content: datum => <Link to={`/user/view/${datum._id}`}>{datum.nome}</Link>
    },
    {
      path: 'login',
      label: 'Login'
    },
    {
      path: 'senha',
      label: 'Senha'
    },
    {
      key: 'delete',
      content: datum => (
        <Link to="/user" onClick={() => this.handleDelete(datum)}>
          {<Delete />}
        </Link>
      )
    },
    {
      key: 'update',
      content: datum => <Link to={`/user/${datum._id}`}>{<Update />}</Link>
    }
  ];

  async componentDidMount() {
    const { data } = await getUsers();
    this.setState({ users: data });
  }

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, searchQuery, users: allUsers } = this.state;

    let filtered = allUsers;
    if (searchQuery) {
      filtered = allUsers.filter(user => user.nome.toLowerCase().startsWith(searchQuery.toLowerCase()));
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const users = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: users };
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleDelete = async user => {
    try {
      await deleteUser(user._id);
      const { users } = this.state;
      const newUsers = users.filter(a => a._id !== user._id);
      this.setState({ users: newUsers });
      toast.success('Deletado com sucesso!');
    } catch (error) {
      toast.error('Esse usuário já foi deletado');
      console.log(error);
    }
  };

  render() {
    // const count = this.state.equipments.length;
    const { pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, data: users } = this.getPagedData();
    return (
      <Dashboard title="Usuários">
        <Row style={{ paddingTop: '25px', paddingBottom: '25px' }}>
          <Col>
            <Link to="/user/new">
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
            data={users}
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

export default User;
