import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary_300: '#3333dd',
    primary_400: '#e33e3e',
    primary_500: '#af0505',
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
)
