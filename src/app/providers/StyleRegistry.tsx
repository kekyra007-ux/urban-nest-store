'use client';

import React, { useState } from 'react';
import { StyleSheetManager } from 'styled-components';

// Redirect all styled-components style injections to a body-div portal so they never
// touch document.head. React 19 owns head reconciliation; any foreign insertions/removals
// there trigger NotFoundError on navigation. The #__page-loader overlay covers the brief
// unstyled window during hydration, so there is no visible FOUC.
export default function StyleRegistry({ children }: { children: React.ReactNode }) {
  const [target] = useState<HTMLElement | null>(() => {
    if (typeof window === 'undefined') return null;
    return document.getElementById('__sc');
  });

  if (target) {
    return (
      <StyleSheetManager target={target} disableCSSOMInjection>
        {children}
      </StyleSheetManager>
    );
  }

  return <>{children}</>;
}
