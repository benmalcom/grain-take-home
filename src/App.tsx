import { Global, css } from '@emotion/react';
import React from 'react';

import TicTacToe from 'components/TicTacToe';

const App: React.FC = () => (
  <>
    <Global
      styles={css`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Helvetica Neue', sans-serif;
          font-size: 20px;
        }
      `}
    />
    <TicTacToe />
  </>
);
export default App;
