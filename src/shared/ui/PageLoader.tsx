'use client';

import { useEffect } from 'react';

/** Dismisses the static #__page-loader overlay after React hydrates. */
export function PageLoaderDismiss() {
  useEffect(() => {
    const el = document.getElementById('__page-loader');
    if (!el) return;

    const timer = setTimeout(() => {
      el.classList.add('--out');
      const remove = setTimeout(() => el.remove(), 420);
      return () => clearTimeout(remove);
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
