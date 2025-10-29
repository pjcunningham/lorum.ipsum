import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Link, Typography, Stack } from '@mui/material';

interface AboutDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutDialog({ open, onClose }: AboutDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="about-dialog-title">
      <DialogTitle id="about-dialog-title">About</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography>
            This app is a placeholder text generator. It lets you choose a language style, tune parameters like average sentence length, complexity, and number of paragraphs, and then generates coherent placeholder paragraphs for your designs and documents.
          </Typography>
          <Typography>
            How it works: the text is AI‑generated using a lightweight Markov‑chain style model seeded with curated example corpora. The generator stitches words and phrases together based on statistical patterns to create natural‑sounding prose that matches the selected style.
          </Typography>
          <Typography>
            Attribution: Content and features were created with assistance from the WebStorm Junie coding agent. The source code is available on GitHub:
            {' '}
            <Link href="https://github.com/pjcunningham/lorum.ipsum" target="_blank" rel="noopener noreferrer">
              https://github.com/pjcunningham/lorum.ipsum
            </Link>.
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
}
