import React from 'react';
import Normalize from 'react-normalize';
import { toast } from 'react-toastify';
import GlobalStyle from './assets/css/global';
import Routes from './routes';
import { createStore } from './hooks/useGlobal';

createStore('sidebar', false);

toast.configure({
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  newestOnTop: true
});

function App() {
  return (
    <React.Fragment>
      <Routes />
      <Normalize />
      <GlobalStyle />
    </React.Fragment>
  );
}

export default App;
