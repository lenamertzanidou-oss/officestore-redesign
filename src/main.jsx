import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { StoreProvider } from './context/StoreContext';
import './styles/main.css';
import './styles/v5.css';
import './styles/v6.css';
import './styles/v7.css';
import './styles/v8.css';
import './styles/v9.css';
import './styles/v10.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <StoreProvider><App/></StoreProvider>
    </HashRouter>
  </React.StrictMode>
);
