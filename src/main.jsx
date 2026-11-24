import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { StoreProvider } from './context/StoreContext';
import './styles/main.css';
import './styles/v5.css';
import './styles/v6.css';
import './styles/v7.css';
import './styles/v8.css';
import './styles/v9.css';
import './styles/v10.css';
import './styles/v11.css';
import './styles/v12.css';
import './styles/v13.css';
import './styles/v14.css';
import './styles/v15.css';
import './styles/v16.css';
import './styles/v17.css';
import './styles/v18.css';
import './styles/v19.css';

if (window.location.hash.startsWith('#/')) {
  const legacyPath = window.location.hash.slice(1);
  window.history.replaceState(null, '', legacyPath);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider><App/></StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
