import { Button, Snackbar } from '@mui/material';
import { useState } from 'react';

type Props = {
  text: string;
};

export default function CopyButton({ text }: Props) {
  const [open, setOpen] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setOpen(true);
    } catch {
      // swallow errors; could add fallback
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleCopy}
        disabled={!text}
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        Copy Text
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}
