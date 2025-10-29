import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { LANGUAGES } from '../lib/TextGenerator';

type Props = {
  value: string;
  onChange: (lang: string) => void;
};

export default function LanguageSelector({ value, onChange }: Props) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="language-label">Language</InputLabel>
      <Select
        labelId="language-label"
        label="Language"
        value={value}
        onChange={(e) => onChange(String(e.target.value))}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem key={lang} value={lang}>{lang}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
