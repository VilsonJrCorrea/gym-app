import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/Layout/Dashboard';

const DashboardPage = () => {
  return (
    <Dashboard title="Página não Encontrada">
      <h4>Infelizmente a página desejada não pode ser encontrada.</h4>
      Se quiser você pode voltar a página inicial clicando <Link to="/dashboard">aqui</Link>.
    </Dashboard>
  );
};

export default DashboardPage;
