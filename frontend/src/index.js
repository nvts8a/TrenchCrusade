// REACT
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// REACT-ROUTER
import Root from './routes/root'
import Equipment from './routes/rules/equipment'
import Factions from './routes/rules/factions'
import Keywords from './routes/rules/keywords'
import Warband from './routes/builder/warband'
import Roster from './routes/builder/warband/roster'
import ErrorPage from './error-page'

// REDUX
import { Provider } from 'react-redux'
import store from './store/store'

// STYLE AND LAYOUT
import Layout from './layout'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './fonts/artisan12.ttf'
import './fonts/EnglishTowne.ttf'
import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Root /></Layout>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/rules/equipment',
    element: <Layout><Equipment /></Layout>,
    
  },
  {
    path: '/rules/factions',
    element: <Layout><Factions /></Layout>,
  },
  {
    path: '/rules/keywords',
    element: <Layout><Keywords /></Layout>,
  },
  {
    path: '/builder/warband/all',
    element: <Layout><Warband /></Layout>
  },
  {
    path: '/builder/warband/:id/roster',
    element: <Layout><Roster /></Layout>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)