export interface GenerationOptions {
  language: string;
  sentenceLength: number; // average words per sentence
  complexity: number; // Markov order (1-5)
  paragraphs: number; // number of paragraphs
}

// Simple corpora per language (tiny sample lines). In a real app these would be larger.
const CORPORA: Record<string, string[]> = {
  "Academese": [
    "The epistemological framework necessitates a robust operationalization of variables.",
    "Methodological rigor substantiates the inferential validity of our findings.",
    "The corpus reveals a salient intertextuality across paradigmatic boundaries."
  ],
  "Corporate Speak": [
    "We need to leverage synergies and align our KPIs for scalable impact.",
    "Let's circle back after we double‑click on the value proposition.",
    "This quarter we're optimizing bandwidth and rightsizing deliverables."
  ],
  "Fedspeak": [
    "Monetary policy remains data dependent within our dual mandate objectives.",
    "The Committee assesses that risks are moving into better balance.",
    "We will continue to reduce holdings at a predictable pace."
  ],
  "Gibberish": [
    "Florp snizzle wamble tronkly zibber wazzle bop.",
    "Mizzle frandor quib snarfle zoodle plink.",
    "Blorptastic wizzle flang dooble cronk."
  ],
  "Lorum Ipsum": [
    "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi."
  ],
  "Officialese": [
    "Pursuant to the aforementioned provisions, the following shall obtain.",
    "It is hereby stipulated that compliance is mandatory and immediate.",
    "The undersigned acknowledges receipt of the directive herein."
  ],
  "Pseudoscience": [
    "Quantum vibrations harmonize with the biofield to unlock wellness.",
    "Crystalline frequencies align chakras for optimal energy throughput.",
    "Astral DNA upgrades catalyze a holistic resonance matrix."
  ],
  "Psychobabble": [
    "Your inner child is negotiating boundaries with the superego's narrative.",
    "Let's hold space for the emergent feelings around that trigger.",
    "There's a lot of meaning‑making in how you contain that anxiety."
  ],
  "Shakespeare": [
    "To thine own self be true, and it must follow, as the night the day.",
    "Full fathom five thy father lies; of his bones are coral made.",
    "The better part of valour is discretion."
  ],
  "Technobabble": [
    "We refactored the microservice to decouple the async event bus.",
    "Polyfilled the WASM pipeline with a zero‑copy buffer allocator.",
    "Sharded the KV store and tuned the GC for low‑latency throughput."
  ]
};

function tokenize(text: string): string[] {
  // Basic word tokenizer: split on whitespace and punctuation, keep sentence enders.
  return text
    .replace(/[^A-Za-zÀ-ÿ0-9\.\!\?\-\' ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function buildMarkov(tokens: string[], order: number): Map<string, string[]> {
  const map = new Map<string, string[]>();
  const pad = Array(order).fill("<START>");
  const seq = [...pad, ...tokens, "<END>"];
  for (let i = 0; i + order < seq.length; i++) {
    const key = seq.slice(i, i + order).join("\u0001");
    const next = seq[i + order];
    const arr = map.get(key);
    if (arr) arr.push(next); else map.set(key, [next]);
  }
  return map;
}

function sample<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSentence(map: Map<string, string[]>, order: number, avgLen: number): string {
  let state = Array(order).fill("<START>");
  const words: string[] = [];
  let steps = 0;
  const maxSteps = Math.max(10, avgLen * 3);
  while (steps < maxSteps) {
    const key = state.join("\u0001");
    const options = map.get(key) || ["<END>"];
    let next = sample(options);
    // Bias towards ending near avgLen
    const nearTarget = words.length >= Math.max(5, avgLen - 2);
    if (nearTarget && Math.random() < 0.25) {
      next = "<END>";
    }
    if (next === "<END>") break;
    if (next !== "<START>") words.push(next);
    state = [...state.slice(1), next];
    steps++;
  }
  // Basic capitalization and punctuation if missing
  let sentence = words.join(" ");
  if (!/[\.!?]$/.test(sentence)) sentence += ".";
  sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  return sentence;
}

export function generateText(options: GenerationOptions): string {
  const { language, sentenceLength, complexity, paragraphs } = options;
  const order = Math.max(1, Math.min(5, Math.round(complexity)));
  const corpus = CORPORA[language] || CORPORA["Lorum Ipsum"];
  const tokens = tokenize(corpus.join(" "));
  const map = buildMarkov(tokens, order);

  const paras: string[] = [];
  for (let p = 0; p < paragraphs; p++) {
    // Each paragraph: 3-6 sentences, scaled by sentenceLength
    const sentenceCount = Math.max(2, Math.min(8, Math.round(sentenceLength / 6) + 2));
    const sentences: string[] = [];
    for (let s = 0; s < sentenceCount; s++) {
      sentences.push(generateSentence(map, order, sentenceLength));
    }
    paras.push(sentences.join(" "));
  }

  return paras.join("\n\n");
}

export const LANGUAGES = Object.keys(CORPORA);
