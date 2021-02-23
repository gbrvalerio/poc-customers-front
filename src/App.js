import React from 'react';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core'
import { RootNavigation } from './navigation/root';
import { APIAuthProvider } from './contexts/APIAuthProvider'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <APIAuthProvider>
        <RootNavigation />
      </APIAuthProvider>
    </ThemeProvider>
  );
}

export default App;
