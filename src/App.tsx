import { useMemo, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import LanguageSelector from './components/LanguageSelector';
import ParameterPanel from './components/ParameterPanel';
import OutputArea from './components/OutputArea';
import CopyButton from './components/CopyButton';
import { usePersistentParams } from './hooks/usePersistentParams';
import type { GenerationOptions } from './lib/TextGenerator';
import { LANGUAGES, generateText } from './lib/TextGenerator';

function App() {
  const [language, setLanguage] = useState<string>(LANGUAGES[0]);
  const { params, setParams } = usePersistentParams(language);
  const [output, setOutput] = useState<string>("");

  const options: GenerationOptions = useMemo(() => ({
    language,
    sentenceLength: params.sentenceLength,
    complexity: params.complexity,
    paragraphs: params.paragraphs,
  }), [language, params]);

  function handleGenerate() {
    const text = generateText(options);
    setOutput(text);
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <LanguageSelector value={language} onChange={setLanguage} />
      <ParameterPanel params={params} onChange={setParams} />

      <Box sx={{ width: '100%' }}>
        <Button
          variant="contained"
          onClick={handleGenerate}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Generate
        </Button>
      </Box>

      <OutputArea value={output} />
      <CopyButton text={output} />
    </Stack>
  );
}

export default App;
