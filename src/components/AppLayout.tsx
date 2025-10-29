import type { PropsWithChildren } from 'react';
import { useMemo, useState } from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, IconButton, Container, Button, Stack, Link } from '@mui/material';
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
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Placeholder Text Generator
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link href="#/" color="inherit" underline="hover">Home</Link>
            <Link href="#/about" color="inherit" underline="hover">About</Link>
          </Stack>
          <IconButton color="inherit" aria-label="toggle dark mode" onClick={() => setMode(prev => prev === 'light' ? 'dark' : 'light')}>
            {mode === 'light' ? 'Dark' : 'Light'}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mt: 3, mb: 6, px: { xs: 1.5, sm: 3 } }}>
        {children}
      </Container>
    </ThemeProvider>
  );
}
