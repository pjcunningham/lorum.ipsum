import { TextField } from '@mui/material';

type Props = {
  value: string;
};

export default function OutputArea({ value }: Props) {
  return (
    <TextField
      label="Output"
      value={value}
      multiline
      minRows={10}
      fullWidth
      InputProps={{ readOnly: true }}
      sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
    />
  );
}
