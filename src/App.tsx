import { BrowserRouter } from 'react-router-dom'
import { basename } from './lib/basename'
import { AppRoutes } from './routes'

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  )
}
