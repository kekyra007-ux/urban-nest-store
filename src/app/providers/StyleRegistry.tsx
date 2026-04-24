'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyleRegistry({ children }: { children: React.ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  // On the client, inject into a stable body-div to avoid React 19 head-management conflicts.
  // document.getElementById runs synchronously in useState so it resolves on the first render.
  const [clientTarget] = useState<HTMLElement | null>(() => {
    if (typeof window === 'undefined') return null;
    return document.getElementById('__sc');
  });

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  // Server-side: collect styles via ServerStyleSheet
  if (typeof window === 'undefined') {
    return (
      <StyleSheetManager sheet={sheet.instance}>
        {children}
      </StyleSheetManager>
    );
  }

  // Client-side: redirect all injections to the body portal
  if (clientTarget) {
    return (
      <StyleSheetManager target={clientTarget} disableCSSOMInjection>
        {children}
      </StyleSheetManager>
    );
  }

  return <>{children}</>;
}
