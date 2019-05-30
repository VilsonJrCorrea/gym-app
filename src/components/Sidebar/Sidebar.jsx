import React from 'react';
import { useStore } from '../../hooks/useGlobal';
import SidebarMenuItems from './SidebarMenuItems';
import * as S from './S.Sidebar';

export default () => {
  const [open] = useStore('sidebar');
  return (
    <S.Sidebar>
      <S.Wrapper open={open}>
        <S.Content open={open}>
          <SidebarMenuItems />
        </S.Content>
      </S.Wrapper>
    </S.Sidebar>
  );
};
