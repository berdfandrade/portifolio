import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Layout from './components/Layout';
import Library from './pages/Library';
import ProjectPage from './pages/ProjectPage';
import About from './pages/About';
import SkillTree from './pages/SkillTree';
import NotFound from './pages/NotFound';
import './styles.css';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { index: true, element: <Library /> },
        { path: 'projeto/:slug', element: <ProjectPage /> },
        { path: 'sobre', element: <About /> },
        { path: 'skill-tree', element: <SkillTree /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
