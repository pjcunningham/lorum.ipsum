import type { PropsWithChildren } from 'react';
import { useMemo, useState } from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, IconButton, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function AppLayout({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<'light' | 'dark'>(() => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  const theme = useMemo(() => createTheme({
    palette: { mode }
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Placeholder Text Generator
          </Typography>
          <IconButton color="inherit" aria-label="toggle dark mode" onClick={() => setMode(prev => prev === 'light' ? 'dark' : 'light')}>
            {mode === 'light' ? 'Dark' : 'Light'}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3, mb: 6 }}>
        {children}
      </Container>
    </ThemeProvider>
  );
}
