import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Puslapiai iš anksto sugeneruoti į HTML – JavaScript jį tik „pažadina“ (hydrate).
// Dev režime HTML tuščias, todėl tada atvaizduojama įprastai.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
