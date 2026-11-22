import { createContext, useContext, useMemo } from 'react';
import { STRINGS } from './strings';
import { PROJECTS } from '../data/projects';
import { PROJECTS_EN } from '../data/projects.en';
import { TREE, flattenTree } from '../data/skills';
import { TREE_EN } from '../data/skills.en';
import { BOOKS } from '../data/books';
import { BOOKS_EN } from '../data/books.en';
import { ERAS, CERTIFICATES } from '../data/experience';
import { ERAS_EN, CERTIFICATES_EN } from '../data/experience.en';

export type Lang = 'pt' | 'en';
export type Page = 'library' | 'project' | 'about' | 'skills' | 'books' | 'contact' | 'experience';

// O português fica na raiz e o inglês em /en, cada um com os próprios nomes de rota.
export const SEGMENTS: Record<Lang, Record<Page, string>> = {
  pt: { library: '', project: 'projeto', about: 'sobre', skills: 'skill-tree', books: 'livros', contact: 'contato', experience: 'experiencia' },
  en: { library: '', project: 'project', about: 'about', skills: 'skill-tree', books: 'books', contact: 'contact', experience: 'experience' },
};

/** Caminho de uma página num idioma: pathTo('en', 'project', 'owlio') → '/en/project/owlio'. */
export function pathTo(lang: Lang, page: Page, slug?: string) {
  const parts = [lang === 'en' ? 'en' : '', SEGMENTS[lang][page], slug ?? ''].filter(Boolean);
  return `/${parts.join('/')}`;
}

const CONTENT = {
  pt: { t: STRINGS.pt, projects: PROJECTS, tree: TREE, skills: flattenTree(TREE), books: BOOKS, eras: ERAS, certificates: CERTIFICATES },
  en: { t: STRINGS.en, projects: PROJECTS_EN, tree: TREE_EN, skills: flattenTree(TREE_EN), books: BOOKS_EN, eras: ERAS_EN, certificates: CERTIFICATES_EN },
};

export const LangContext = createContext<Lang>('pt');

/** Idioma atual com seus textos, conteúdo e o gerador de links. */
export function useI18n() {
  const lang = useContext(LangContext);
  return useMemo(() => {
    const content = CONTENT[lang];
    return {
      lang,
      ...content,
      to: (page: Page, slug?: string) => pathTo(lang, page, slug),
      findProject: (slug: string | undefined) => content.projects.find((p) => p.slug === slug && p.page),
    };
  }, [lang]);
}
