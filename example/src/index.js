import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { MultiBusyProvider } from 'react-multi-busy'
import { CssBaseline } from '@material-ui/core'

ReactDOM.render(
  <CssBaseline>
    <MultiBusyProvider>
      <App />
    </MultiBusyProvider>
  </CssBaseline>,
  document.getElementById('root')
)
