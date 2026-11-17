import { useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { LangContext, type Lang } from '../i18n';
import { STRINGS } from '../i18n/strings';

export default function Layout({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = STRINGS[lang].locale;
  }, [lang]);

  return (
    <LangContext.Provider value={lang}>
      <Outlet />
      <ScrollRestoration />
    </LangContext.Provider>
  );
}

/** Define o título da aba: "<título> — Bernardo". */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — Bernardo`;
  }, [title]);
}
