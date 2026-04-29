'use client';

import { useEffect } from 'react';

/** Dismisses the static #__page-loader overlay after React hydrates. */
export function PageLoaderDismiss() {
  useEffect(() => {
    const el = document.getElementById('__page-loader');
    if (!el) return;

    const timer = setTimeout(() => {
      el.classList.add('--out');
      // Hide via display:none after the fade — do NOT call el.remove().
      // React owns this DOM node (rendered in layout.tsx) and uses it as a
      // reference point for insertBefore/removeChild during navigation.
      // Removing it from the DOM breaks React's fiber-tree assumptions → NotFoundError.
      const hide = setTimeout(() => { el.style.display = 'none'; }, 420);
      return () => clearTimeout(hide);
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
