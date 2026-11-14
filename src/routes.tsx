import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'

// Vidiniai puslapiai įkeliami tik juos atidarius – mažesnis pradinis JS kiekis.
// Build metu visi puslapiai iš anksto sugeneruojami į HTML (žr. scripts/prerender.mjs).
const Services = lazy(() => import('./pages/Services'))
const Materials = lazy(() => import('./pages/Materials'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Advice = lazy(() => import('./pages/Advice'))
const AdviceArticle = lazy(() => import('./pages/AdviceArticle'))
const Planner = lazy(() => import('./pages/Planner'))

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="paslaugos" element={<Services />} />
        <Route path="terasu-tipai" element={<Materials />} />
        <Route path="atlikti-darbai" element={<Projects />} />
        <Route path="atlikti-darbai/:slug" element={<ProjectDetail />} />
        <Route path="patarimai" element={<Advice />} />
        <Route path="patarimai/:slug" element={<AdviceArticle />} />
        <Route path="terasos-planuokle" element={<Planner />} />
        <Route path="apie-mus" element={<About />} />
        <Route path="kontaktai" element={<Contact />} />
        <Route path="privatumo-politika" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
