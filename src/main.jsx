import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './components/index.css'
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Username from './components/Username.jsx';
import Form from './components/Form.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/form/:url',
        element: <Form />
      }, {
        path: '/username',
        element: <Username />
      }
    ]
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
