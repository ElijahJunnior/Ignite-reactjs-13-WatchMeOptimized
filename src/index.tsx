import { render } from 'react-dom'

import { App } from './App'
import { GenreProvider } from './contexts/GenreContext'

render(
  <GenreProvider>
    <App />
  </GenreProvider>
, document.getElementById('root'))