import axios from 'axios';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/authContext.jsx';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster position='top-center' />
    </AuthProvider>
  </BrowserRouter>,
)