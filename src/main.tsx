import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, type RouteObject } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Layout from './components/Layout';
import Library from './pages/Library';
import ProjectPage from './pages/ProjectPage';
import About from './pages/About';
import SkillTree from './pages/SkillTree';
import Books from './pages/Books';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { SEGMENTS, type Lang, type Page } from './i18n';
import './styles.css';

// `handle.page` diz qual página é cada rota, para o botão de idioma achar a equivalente.
const pages = (lang: Lang): RouteObject[] => {
  const seg = SEGMENTS[lang];
  const page = (p: Page) => ({ page: p });
  return [
    { index: true, element: <Library />, handle: page('library') },
    { path: `${seg.project}/:slug`, element: <ProjectPage />, handle: page('project') },
    { path: seg.about, element: <About />, handle: page('about') },
    { path: seg.skills, element: <SkillTree />, handle: page('skills') },
    { path: seg.books, element: <Books />, handle: page('books') },
    { path: seg.contact, element: <Contact />, handle: page('contact') },
    { path: '*', element: <NotFound /> },
  ];
};

const router = createBrowserRouter(
  [
    { path: '/en', element: <Layout lang="en" />, children: pages('en') },
    { path: '/', element: <Layout lang="pt" />, children: pages('pt') },
  ],
  { basename: import.meta.env.BASE_URL },
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
