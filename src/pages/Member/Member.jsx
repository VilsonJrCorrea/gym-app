import React from 'react';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import _ from "lodash";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dashboard from '../../components/Layout/Dashboard';
import CustomTable from '../../components/common/table/CustomTable';
import Delete from "../../components/common/table/Delete";
import Update from "../../components/common/table/Update";
import Search from "../../components/common/search/Search";
import Pagination from "../../components/common/pagination/Pagination";
import  paginate from "../../utils/paginate";

import {
  getMembers,
  deleteMember } from "../../services/memberService";
import "bootstrap/dist/css/bootstrap.css";

class MemberPage extends React.Component {
  state = {
    members: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "nome", order: "asc" }
  };

  columns = [
    {
      path: "nome",
      label: "Nome",
      content: datum => (
        <Link to={`/member/view/${datum._id}`}>
          {datum.nome}
        </Link>
      )
    },
    {
      path: "celular",
      label: "Celular"
    },
    {
      key: "delete",
      content: datum => (
        <Link to="/member" onClick={() => this.handleDelete(datum)}>
          {<Delete/>}
        </Link>
      )
    },
    {
      key: "update",
      content: datum => (
        <Link to={`/member/${datum._id}`}>
          {<Update/>}
        </Link>
      )
    }
  ];

  async componentDidMount() {
    const { data } = await getMembers();
    this.setState({ members: data });
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      members: allMembers
    } = this.state;

    let filtered = allMembers;
    if (searchQuery) {
      filtered = allMembers.filter(member =>
        member.nome.toLowerCase().startsWith(searchQuery.toLowerCase())
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

  handleDelete = async aluno => {
    try {
      await deleteMember(aluno._id);
      const {members} = this.state;
      const newMembers = members.filter(a => a._id !== aluno._id);
      this.setState({ members:newMembers });
      toast.success("Deletado com sucesso!");
    } catch (error) {
      toast.error("Esse aluno já foi deletado");
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  render(){
    // const count = this.state.members.length;
    const {
      pageSize,
      currentPage,
      searchQuery,
    } = this.state;
    const { totalCount, data: members } = this.getPagedData();
    return (
      <Dashboard title="Alunos">
        <Row style={{ paddingTop: "25px", paddingBottom: "25px" }}>
          <Col>
            <Link to="/member/new">
              <Button variant="primary">
                  Novo
              </Button>
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
      </Dashboard>
    );
  }
};

export default MemberPage;
