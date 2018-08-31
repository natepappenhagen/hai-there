import React from 'react';
import styled from 'styled-components';
import { func, string } from 'prop-types';

AuthButton.propTypes = {
  onAuth: func.isRequired,
  authType: string.isRequired
};

function AuthButton({ onAuth, authType }) {
  return (
    <Button
      authType={authType}
      onClick={(e) => onAuth(e, authType)}
    >{`Login with ${authType}`}
    </Button>
  );
}

const Button = styled.button`
  ${({ authType }) => {
    switch (authType) {
      case 'Facebook':
        return 'background: #3B5998';
      case 'Github':
        return 'background: #24292e';
      case 'Email':
        return 'background: #1b691a';
      default:
        return null;
    }
  }};
  border-radius: 5px;
  border-width: 0;
  color: #fff;
  cursor: pointer;
  font-size: 25px;
  margin-bottom: 0.625em;
  outline: none;
  padding: 0.5em 0.25em;
  width: 11em;

  &:hover {
  ${({ authType }) => {
    switch (authType) {
      case 'Facebook':
        return 'background: #1542A0';
      case 'Github':
        return 'background: #15181b';
      case 'Email':
        return 'background: #0f820f';
      default:
        return null;
    }
  }};
  }
`;

export default AuthButton;
