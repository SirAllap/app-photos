import React from 'react'
import Routes from './router/Routes'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from '../src/app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)