import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Context/AuthContext/AuthContextProvider';
import { WebsocketProvider } from './Context/WebsocketContext/WebsocketContextProvider';
import { NotifyProvider } from './Context/NotifyContext/NotifyContextProvider';
import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
    <WebsocketProvider>
      <AuthProvider>
        <NotifyProvider>
          <App />
        </NotifyProvider>
      </AuthProvider>
    </WebsocketProvider>
);

reportWebVitals();
