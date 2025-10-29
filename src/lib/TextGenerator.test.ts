import { describe, it, expect } from 'vitest';
import { generateText } from './TextGenerator';

describe('generateText', () => {
  it('generates the requested number of paragraphs separated by blank lines', () => {
    const text = generateText({
      language: 'Academese',
      sentenceLength: 10,
      complexity: 2,
      paragraphs: 4,
    });
    const paras = text.split(/\n\n/);
    expect(paras.length).toBe(4);
    expect(paras[0].length).toBeGreaterThan(0);
  });

  it('completes quickly for 10 paragraphs', () => {
    const start = performance.now();
    generateText({ language: 'Academese', sentenceLength: 12, complexity: 2, paragraphs: 10 });
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(500);
  });
});
