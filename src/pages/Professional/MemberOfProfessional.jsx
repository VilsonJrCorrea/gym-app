import React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dashboard from '../../components/Layout/Dashboard';
import CustomTable from '../../components/common/table/CustomTable';
import Search from '../../components/common/search/Search';
import Pagination from '../../components/common/pagination/Pagination';
import paginate from '../../utils/paginate';
import Connect from "../../components/common/buttons/Connect";
import Disconnect from "../../components/common/buttons/Disconnect";

import { getMembers } from '../../services/memberService';
import 'bootstrap/dist/css/bootstrap.css';

class MemberPage extends React.Component {
  state = {
    members: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: '',
    sortColumn: { path: 'nome', order: 'asc' }
  };

  columns = [
    {
      path: 'nome',
      label: 'Nome',
      content: datum => <Link to={`/member/view/${datum._id}`}>{datum.nome}</Link>
    },
    {
      path: 'celular',
      label: 'Celular'
    },
    {
      key: 'connect',
      content: datum => (
        <button className="btn btn-primary" type="submit"
          onClick={
            event=>{event.preventDefault();
              // eslint-disable-next-line react/destructuring-assignment
              this.props.onConnect(datum)}}>
          {this.props.onRenderConnect(datum)? <Disconnect/>:<Connect/>}
        </button>
      )
    }
  ];

  async componentDidMount() {
    const { data } = await getMembers();
    this.setState({ members: data });
  }

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, searchQuery, members: allMembers } = this.state;
    let filtered = allMembers;
    if (searchQuery) {
      filtered = allMembers.filter(member => member.nome.toLowerCase().startsWith(searchQuery.toLowerCase()));
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

  render() {
    const { pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, data: members } = this.getPagedData();
    return (
      <>
        <Row>
          <h3>Alunos</h3>
        </Row>
        <Row style={{ paddingTop: '25px', paddingBottom: '25px' }}>
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
            data={members}
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
      </>
    );
  }
}

export default MemberPage;
