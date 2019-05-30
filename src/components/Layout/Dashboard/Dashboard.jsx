import React from 'react';
import Helmet from 'react-helmet';
import * as S from './S.Dashboard';
import Sidebar from '../../Sidebar';

export default ({ children, title }) => (
  <S.Wrapper>
    <Helmet title={`${title} - Observatório de Educação Básica`} />
    <Sidebar />
    <S.MainWrapper>
      <S.MainContainer>
        <S.MainTitle>{title}</S.MainTitle>
        {children}
      </S.MainContainer>
    </S.MainWrapper>
  </S.Wrapper>
);
