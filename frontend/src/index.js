// REACT
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// REACT-ROUTER
import Root from './routes/root'
import ErrorPage from './error-page'

import Warband from './routes/builder/warband'
import Roster from './routes/builder/warband/roster'

import Factions from './routes/lore/factions'

import Equipment from './routes/rules/equipment'
import Keywords from './routes/rules/keywords'
import TroopTypes from './routes/rules/troopTypes'


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
import Timeline from './routes/lore/timeline'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Root /></Layout>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/builder/warband/all',
    element: <Layout><Warband /></Layout>
  },
  {
    path: '/builder/warband/:id/roster',
    element: <Layout><Roster /></Layout>
  },
  {
    path: '/lore/factions',
    element: <Layout><Factions /></Layout>,
  },
  {
    path: '/lore/timeline',
    element: <Layout><Timeline /></Layout>,
  },
  {
    path: '/rules/equipment',
    element: <Layout><Equipment /></Layout>,
    
  },
  {
    path: '/rules/keywords',
    element: <Layout><Keywords /></Layout>,
  },
  {
    path: '/rules/troop-types',
    element: <Layout><TroopTypes /></Layout>,
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