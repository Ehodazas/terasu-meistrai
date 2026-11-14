import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'

// Vidiniai puslapiai įkeliami tik juos atidarius – mažesnis pradinis JS kiekis
const Services = lazy(() => import('./pages/Services'))
const Materials = lazy(() => import('./pages/Materials'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))

// basename leidžia talpinti svetainę pakatalogyje (pvz., GitHub Pages /repo/)
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="paslaugos" element={<Services />} />
          <Route path="terasu-tipai" element={<Materials />} />
          <Route path="atlikti-darbai" element={<Projects />} />
          <Route path="atlikti-darbai/:slug" element={<ProjectDetail />} />
          <Route path="apie-mus" element={<About />} />
          <Route path="kontaktai" element={<Contact />} />
          <Route path="privatumo-politika" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
