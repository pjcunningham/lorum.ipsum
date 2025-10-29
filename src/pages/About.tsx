import { Box, Link, Stack, Typography } from '@mui/material';

export default function About() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>About</Typography>
      <Stack spacing={2}>
        <Typography>
          This app is a placeholder text generator. Choose a language style, adjust parameters like average sentence length, complexity, and number of paragraphs, then generate coherent placeholder paragraphs for your designs and documents.
        </Typography>
        <Typography>
          How it works: the text is AI‑generated using a lightweight Markov‑chain style model seeded with curated example corpora. The generator stitches words and phrases together based on statistical patterns to create natural‑sounding prose that matches the selected style.
        </Typography>
        <Typography>
          Attribution: The placeholder text in this app is AI‑generated from the WebStorm Junie coding agent. The source code is available on GitHub:
          {' '}
          <Link href="https://github.com/pjcunningham/lorum.ipsum" target="_blank" rel="noopener noreferrer">
            https://github.com/pjcunningham/lorum.ipsum
          </Link>.
        </Typography>
        <Typography>
          <Link href="#/" underline="hover">Return to the generator</Link>
        </Typography>
      </Stack>
    </Box>
  );
}
