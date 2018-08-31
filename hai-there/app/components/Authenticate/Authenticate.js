import React from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import { AuthButton } from 'components';
import { centeredContainer, largeHeader, errorMsg } from 'sharedStyles';

Authenticate.propTypes = {
  error: string.isRequired,
  onAuth: func.isRequired
};

function Authenticate({ onAuth, error }) {
  return (
    <Wrapper>
      <Header>Authenticate</Header>
      <AuthButton authType='Facebook' onAuth={(e) => onAuth(e, 'Facebook')} />
      <AuthButton authType='Github' onAuth={(e) => onAuth(e, 'Github')} />
      {/* <AuthButton authType='Email' onAuth={(e) => onAuth(e, 'Email')} /> */}
      {
        error
          ? <ErrorMsg>{error}</ErrorMsg>
          : null
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${centeredContainer}
`;

const Header = styled.h1`
  ${largeHeader}
`;

const ErrorMsg = styled.p`
  ${errorMsg}
`;

export default Authenticate;
