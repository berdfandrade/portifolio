import { useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

export default function Layout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

/** Define o título da aba: "<título> — Bernardo". */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — Bernardo`;
  }, [title]);
}
