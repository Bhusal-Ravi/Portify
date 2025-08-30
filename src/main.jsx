import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './components/index.css'
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Username from './components/Username.jsx';
import Form from './components/Form.jsx';

import PortFolio from './components/PortFolio.jsx';
import UserProfile from './components/UserProfile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Formedit from './components/Formedit.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [

      {
        path: '/',
        element: <Home />
      },
      {
        path: '/form/:url',
        element: <Form />
      }, {
        path: '/formedit/:editurl',
        element: <Formedit />
      },
      {
        path: '/username',
        element: <Username />
      }, {
        path: '/:url',
        element: <PortFolio />
      }, {
        path: '/userprofile',
        element: <ProtectedRoute><UserProfile /></ProtectedRoute>
      }
    ]
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
