import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled/macro';

const Banner = styled.div<{
  isSlidUp?: boolean;
}>`
  width: 140px;
  background-color: #5cb85c;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Raleway', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  position: absolute;
  text-transform: uppercase;
  top: 0;
  height: 40px;
  overflow: hidden;
  animation: ${({ isSlidUp }) =>
    isSlidUp &&
    css`
      ${slidUp} 0.5s linear both
    `};
`;

const slidUp = keyframes`
  from {
    visibility: visible;
    height: 40px;
  }

  to {
    visibility: hidden;
    height: 0;
  }
`;

export default Banner;
