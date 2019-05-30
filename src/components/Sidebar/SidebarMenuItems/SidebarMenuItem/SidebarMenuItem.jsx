import React from 'react';
import { Icon } from 'react-icons-kit';
import { useStore } from '../../../../hooks/useGlobal';
import * as S from './S.SidebarMenuItem';

export default ({ link, icon, title, onClickHandler }) => {
  const [open] = useStore('sidebar');

  let linkComponent = (
    <S.ItemLink to={link} title={!open ? title : null} open={open}>
      <Icon icon={icon} /> {open ? title : null}
    </S.ItemLink>
  );

  if (!link) {
    linkComponent = (
      <S.ItemLink onClick={onClickHandler} open={open} to="#" title={!open ? title : null}>
        <Icon icon={icon} /> {open ? title : null}
      </S.ItemLink>
    );
  }

  return <S.Item>{linkComponent}</S.Item>;
};
