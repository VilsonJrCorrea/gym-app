import React from 'react';
import styled from 'styled-components';
import { home } from 'react-icons-kit/icomoon';
import { user } from 'react-icons-kit/ikons/user';
import { exit } from 'react-icons-kit/icomoon/exit';
import { fileText } from 'react-icons-kit/icomoon/fileText';
import { priceTags } from 'react-icons-kit/icomoon/priceTags';
import { paragraphRight } from 'react-icons-kit/icomoon/paragraphRight';
import { paragraphLeft } from 'react-icons-kit/icomoon/paragraphLeft';
import { useStore } from '../../../hooks/useGlobal';
import { logout } from '../../../services/auth';
import SidebarMenuItem from './SidebarMenuItem';

const List = styled.ul`
  margin-top: 0.8rem;
  list-style: none;
`;

export default () => {
  const [open, openSidebar] = useStore('sidebar');
  return (
    <List>
      <SidebarMenuItem
        onClickHandler={() => openSidebar(!open)}
        link=""
        icon={open ? paragraphRight : paragraphLeft}
        title=""
      />
      <SidebarMenuItem link="/dashboard" icon={home} title="Página Inicial" />
      <SidebarMenuItem link="/member" icon={user} title="Alunos" />
      <SidebarMenuItem link="/commerce" icon={priceTags} title="Comércios" />
      <SidebarMenuItem link="/equipment" icon={fileText} title="Equipamentos" />
      <SidebarMenuItem link="/404" icon={exit} title="Página de 404" />
      <SidebarMenuItem onClickHandler={() => logout()} link="" icon={exit} title="Sair" />
    </List>
  );
};
