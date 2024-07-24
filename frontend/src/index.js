// REACT
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// REACT-ROUTER
import Root from './routes/root'

import Charts from './routes/rules/charts'
import Core from './routes/rules/core'
import Equipment from './routes/rules/equipment'
import Factions from './routes/rules/factions'
import Keywords from './routes/rules/keywords'
import Roster from './routes/builder/warband/roster'
import TroopTypes from './routes/rules/troopTypes'
import Warband from './routes/builder/warband'

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

// API AND AUTH
import axios from 'axios'
import { loader } from './utils/loader'
import ErrorBoundary from './routes/error'
import ContentManagement from './routes/cms'
import { cmsLoader } from './utils/cmsLoader'
axios.defaults.baseURL = window.location.origin + '/api'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('authorization')

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Root /></Layout>
  },
  {
    path: '/rules/charts',
    element: <Layout><Charts /></Layout>,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/rules/core',
    element: <Layout><Core /></Layout>,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/rules/equipment',
    element: <Layout><Equipment /></Layout>,
    loader: () => loader({ equipment: true }),
    errorElement: <ErrorBoundary />
  },
  {
    path: '/rules/factions',
    element: <Layout><Factions /></Layout>,
    loader: () => loader({ factions: true }),
    errorElement: <ErrorBoundary />
  },
  {
    path: '/rules/keywords',
    element: <Layout><Keywords /></Layout>,
    loader: () => loader({ keywords: true }),
    errorElement: <ErrorBoundary />
  },
  {
    path: '/rules/troop-types',
    element: <Layout><TroopTypes /></Layout>,
    loader: () => loader({ troopTypes: true }),
    errorElement: <ErrorBoundary />
  },
  {
    path: '/builder/warband/all',
    element: <Layout><Warband /></Layout>,
    loader: () => loader({ factions: true }),
    errorElement: <ErrorBoundary />
  },
  {
    path: '/builder/warband/:id/roster',
    element: <Layout><Roster /></Layout>,
    loader: () => loader({ equipment: true, factions: true, factionEquipment: true, factionTroopTypes: true, keywords: true, troopTypes: true }),
    errorElement: <ErrorBoundary />
  },
  {
    path: '/cms',
    element: <Layout><ContentManagement /></Layout>,
    loader: () => cmsLoader()
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)