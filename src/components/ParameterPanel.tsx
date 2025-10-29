import Box from '@mui/material/Box';
import { Slider, TextField, Typography } from '@mui/material';
import type { Params } from '../hooks/usePersistentParams';

type Props = {
  params: Params;
  onChange: (next: Params) => void;
};

export default function ParameterPanel({ params, onChange }: Props) {
  const set = (patch: Partial<Params>) => onChange({ ...params, ...patch });

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        alignItems: 'center'
      }}>
        <Box>
          <Typography gutterBottom>Sentence Length: {params.sentenceLength}</Typography>
          <Slider
            value={params.sentenceLength}
            min={5}
            max={30}
            step={1}
            valueLabelDisplay="auto"
            onChange={(_, v) => set({ sentenceLength: Number(v) })}
          />
        </Box>
        <Box>
          <TextField
            type="number"
            label="Sentence Length"
            size="small"
            fullWidth
            inputProps={{ min: 5, max: 30 }}
            value={params.sentenceLength}
            onChange={(e) => set({ sentenceLength: Math.max(5, Math.min(30, Number(e.target.value))) })}
          />
        </Box>

        <Box>
          <Typography gutterBottom>Sentence Complexity: {params.complexity}</Typography>
          <Slider
            value={params.complexity}
            min={1}
            max={5}
            step={1}
            marks
            valueLabelDisplay="auto"
            onChange={(_, v) => set({ complexity: Number(v) })}
          />
        </Box>
        <Box>
          <TextField
            type="number"
            label="Complexity"
            size="small"
            fullWidth
            inputProps={{ min: 1, max: 5 }}
            value={params.complexity}
            onChange={(e) => set({ complexity: Math.max(1, Math.min(5, Number(e.target.value))) })}
          />
        </Box>

        <Box>
          <Typography gutterBottom>Paragraphs: {params.paragraphs}</Typography>
          <Slider
            value={params.paragraphs}
            min={1}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
            onChange={(_, v) => set({ paragraphs: Number(v) })}
          />
        </Box>
        <Box>
          <TextField
            type="number"
            label="Paragraphs"
            size="small"
            fullWidth
            inputProps={{ min: 1, max: 10 }}
            value={params.paragraphs}
            onChange={(e) => set({ paragraphs: Math.max(1, Math.min(10, Number(e.target.value))) })}
          />
        </Box>
      </Box>
    </Box>
  );
}
