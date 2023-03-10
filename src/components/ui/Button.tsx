import styled from '@emotion/styled';

const Button = styled.button`
  width: 300px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Raleway', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  color: #ffffff;
  background-color: #201238;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover,
  &:disabled {
    background: rgba(40, 45, 79, 0.66);
  }
`;

export default Button;
