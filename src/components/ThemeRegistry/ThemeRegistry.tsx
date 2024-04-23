'use client';

import { ReactNode } from 'react';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { CssBaseline, ThemeProvider } from '@mui/material';
import defaultDarkTheme from './theme';

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={defaultDarkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
