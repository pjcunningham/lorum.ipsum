export interface GenerationOptions {
  language: string;
  sentenceLength: number; // average words per sentence
  complexity: number; // Markov order (1-5)
  paragraphs: number; // number of paragraphs
}

// Simple corpora per language (expanded sample lines). In a real app these would be larger.
const CORPORA: Record<string, string[]> = {
  "Academese": [
    "The epistemological framework necessitates a robust operationalization of variables.",
    "Methodological rigor substantiates the inferential validity of our findings.",
    "The corpus reveals a salient intertextuality across paradigmatic boundaries.",
    "Our theoretical apparatus foregrounds the dialectic between structure and agency.",
    "Empirical instantiation elucidates the latent constructs embedded within the dataset.",
    "The heuristic offers a provisional yet generative lens for interpretive analysis.",
    "A multivariate approach attenuates endogeneity and enhances causal inference.",
    "The literature converges on a consensus that remains methodologically underdetermined.",
    "Iterative triangulation corroborates the robustness of the emergent typologies.",
    "The observed heterogeneity implies context‑contingent boundary conditions.",
    "Our null findings problematize the assumed universality of prior claims.",
    "Parameter tuning yielded marginal gains within acceptable confidence intervals.",
    "Operational definitions were calibrated to maximize construct validity.",
    "The analytic pipeline implements a reproducible, open science protocol.",
    "Post‑hoc sensitivity analyses indicate the effect is not an artifact of model choice.",
    "These results scaffold a research agenda oriented toward translational impact.",
    "We interrogate the ontological commitments of competing paradigms.",
    "The residuals exhibit no discernible pattern, satisfying homoscedasticity assumptions.",
    "Our contribution is primarily conceptual, with secondary methodological implications.",
    "Future work should adjudicate among rival explanations via preregistered designs."
  ],
  "Corporate Speak": [
    "We need to leverage synergies and align our KPIs for scalable impact.",
    "Let's circle back after we double‑click on the value proposition.",
    "This quarter we're optimizing bandwidth and rightsizing deliverables.",
    "We're empowering cross‑functional squads to accelerate time‑to‑value.",
    "Let's socialize the deck and get buy‑in from key stakeholders.",
    "We should operationalize learnings into a repeatable playbook.",
    "Our north star metric will ladder up to strategic OKRs.",
    "We are sunsetting low‑ROI initiatives to free up runway.",
    "Let's de‑risk the roadmap with incremental, test‑and‑learn pilots.",
    "We will instrument the funnel to surface actionable insights.",
    "There is an opportunity to monetize adjacent workflows.",
    "We must right‑size the scope to avoid analysis paralysis.",
    "Let's peel the onion and identify root causes, not just symptoms.",
    "We need a single throat to choke for end‑to‑end accountability.",
    "This is a low‑lift, high‑leverage win if we sequence it correctly.",
    "Let's park that and move it to the backlog for future sprints.",
    "We should A/B test the pricing page to optimize conversion.",
    "The board wants a crisp narrative with defensible numbers.",
    "Let's calibrate expectations and manage the communication cascade.",
    "We'll table stakes the basics before we boil the ocean."
  ],
  "Fedspeak": [
    "Monetary policy remains data dependent within our dual mandate objectives.",
    "The Committee assesses that risks are moving into better balance.",
    "We will continue to reduce holdings at a predictable pace.",
    "Inflation has eased somewhat but remains elevated.",
    "Labor market conditions have cooled while staying resilient.",
    "We are prepared to adjust the stance of policy as appropriate.",
    "Financial conditions reflect the cumulative tightening in policy.",
    "We will proceed carefully as we evaluate incoming information.",
    "Balance sheet normalization will continue in a gradual and predictable manner.",
    "Our tools are well positioned to support the flow of credit.",
    "Longer‑term inflation expectations remain well anchored.",
    "We do not seek to impede growth but to restore price stability.",
    "The Committee will remain attentive to risks to the outlook.",
    "Policy decisions will be communicated with clarity and transparency.",
    "We recognize the hardship that high inflation imposes.",
    "We will maintain optionality and retain flexibility as conditions evolve.",
    "The modal path of policy is subject to considerable uncertainty.",
    "We are closely monitoring developments in the banking sector.",
    "We judge that progress toward our goals has been made but is incomplete.",
    "We continue to believe that restoring price stability benefits everyone."
  ],
  "Gibberish": [
    "Florp snizzle wamble tronkly zibber wazzle bop.",
    "Mizzle frandor quib snarfle zoodle plink.",
    "Blorptastic wizzle flang dooble cronk.",
    "Zaboo nifflax sproingled drumble wiffle tood.",
    "Glibber flarnix zizzlepop grundle snip.",
    "Quorple snazz wibble frindle zop.",
    "Trundle flib snorble wazz kazoo.",
    "Bizzle frim fram dribble snuck.",
    "Womple zazzle krink snarf toodle.",
    "Gribbly flomp snickerdax quazzle bing.",
    "Snoodle prang wizzlefrap blonk.",
    "Krundle flizz womp kazingle drat.",
    "Zindle pribble frax noodlebop zing.",
    "Wizzle snarfle floggle drim zup.",
    "Plorp quindle zazz frip snook.",
    "Skribble flom tizzle drabble poik.",
    "Nizzle fronk splorp wimble zoot.",
    "Trizzle blarf quib nixmo flan.",
    "Swizzle pronk flomple glazz drip.",
    "Brizzle frabble quonk zoodle sprig."
  ],
  "Lorum Ipsum": [
    "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.",
    "Phasellus viverra nulla ut metus varius laoreet.",
    "Curabitur ullamcorper ultricies nisi nam eget dui.",
    "Donec quam felis ultricies nec pellentesque eu pretium quis sem.",
    "Nulla consequat massa quis enim donec pede justo fringilla vel aliquet.",
    "Aenean commodo ligula eget dolor aenean massa.",
    "Cum sociis natoque penatibus et magnis dis parturient montes.",
    "Nullam dictum felis eu pede mollis pretium integer tincidunt.",
    "Etiam ultricies nisi vel augue curabitur ullamcorper ultricies nisi.",
    "Nam quam nunc blandit vel luctus pulvinar hendrerit id lorem.",
    "Maecenas nec odio et ante tincidunt tempus.",
    "Quisque rutrum aenean imperdiet etiam ultricies nisi vel augue.",
    "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.",
    "Praesent blandit laoreet nibh fusce convallis metus id felis luctus.",
    "Pellentesque habitant morbi tristique senectus et netus et malesuada.",
    "Morbi ac felis nunc donec vitae sapien ut libero venenatis faucibus."
  ],
  "Officialese": [
    "Pursuant to the aforementioned provisions, the following shall obtain.",
    "It is hereby stipulated that compliance is mandatory and immediate.",
    "The undersigned acknowledges receipt of the directive herein.",
    "Notwithstanding any contrary indication, the prior order remains in effect.",
    "For the avoidance of doubt, this notice supersedes all prior communications.",
    "All stakeholders are directed to govern themselves accordingly.",
    "Failure to adhere may be subject to penalties as prescribed by law.",
    "The agency reserves the right to modify procedures without prior notice.",
    "By executing this instrument, the signatory attests to its accuracy.",
    "This memorandum is issued under the authority vested in the office.",
    "Enclosures are incorporated herein by reference as if fully set forth.",
    "The foregoing shall be construed in a manner consistent with applicable statutes.",
    "Requests for clarification shall be submitted in writing within ten days.",
    "Any waiver of requirements must be granted expressly and in writing.",
    "Whereas conditions have materially changed, adjustments are warranted.",
    "The provisions herein are severable and independently enforceable.",
    "Nothing herein shall be interpreted to confer rights not otherwise provided.",
    "Effective upon issuance, this guidance shall remain until rescinded.",
    "The record shall reflect compliance with the procedural prerequisites.",
    "Questions may be directed to the office of the undersigned."
  ],
  "Pseudoscience": [
    "Quantum vibrations harmonize with the biofield to unlock wellness.",
    "Crystalline frequencies align chakras for optimal energy throughput.",
    "Astral DNA upgrades catalyze a holistic resonance matrix.",
    "Scalar waves recalibrate the meridians to transmute dense energies.",
    "Epigenetic affirmations activate the pineal gateway of abundance.",
    "Holographic nutrition encodes light into the cellular lattice.",
    "Zero‑point intention collapses limiting timelines into coherence.",
    "Sacred geometry templates attune water memory to higher octaves.",
    "Vibratory homeopathy entrains the aura to crystalline stillness.",
    "Bio‑photonic breathwork liberates somatic imprints from the field.",
    "Akashic recalibration restores sovereignty to the sovereign self.",
    "Torsion fields amplify heart‑brain entrainment for effortless flow.",
    "Subtle‑energy detox releases karmic residues from the etheric body.",
    "Binaural alchemy synchronizes hemispheres for quantum manifesting.",
    "Auric shielding mitigates 5D interference from lower densities.",
    "Neural light codes awaken dormant strands of starseed heritage.",
    "Frequency tinctures retune the mitochondria to bliss frequencies.",
    "Cosmic coherence upgrades the morphogenetic blueprint.",
    "Chakric harmonics open the portal of compassionate neutrality.",
    "Timeline hopping reweaves destiny across parallel realities."
  ],
  "Psychobabble": [
    "Your inner child is negotiating boundaries with the superego's narrative.",
    "Let's hold space for the emergent feelings around that trigger.",
    "There's a lot of meaning‑making in how you contain that anxiety.",
    "Notice how your somatic wisdom is asking for co‑regulation.",
    "What would it be like to resource yourself in this moment.",
    "I’m hearing a story that safety equals control—does that land.",
    "Let's get curious about the parts that feel polarized.",
    "Can we name the unmet need underneath the reactivity.",
    "You're setting a beautiful boundary and that’s courageous.",
    "I invite you to notice what’s alive in your body right now.",
    "There’s a protector part that’s working really hard.",
    "What permission do you need to move toward integration.",
    "I'm sensing some cognitive distortions around all‑or‑nothing thinking.",
    "Can we reframe that as an opportunity for self‑compassion.",
    "Let's attune to the grief that shows up when you slow down.",
    "That sounds like a bid for connection that wasn’t received.",
    "What boundary might serve the relationship and your nervous system.",
    "Let's metabolize that shame with some grounding breath.",
    "You don’t have to earn rest; rest can be a practice.",
    "What would support look like if it were 10 percent more resourced."
  ],
  "Shakespeare": [
    "Hark, the quiet hour doth whisper of untended vows.",
    "If thou wouldst speak, let truth outpace thy fickle tongue.",
    "Full oft the moon doth chide the sea for borrowed light.",
    "I wear my heart unseamed, yet none do mark the stitch.",
    "Thy kindness is a crown no tempest can unthrone.",
    "Where envy treads, the roses pale for lack of blush.",
    "I am not tempest‑proof, yet I can steer the storm.",
    "A petty king am I, that rules a realm of doubts.",
    "Give me thy hand; our fortunes shall conspire to rise.",
    "The hour is lean, yet hope hath bread for two.",
    "What light is this that bargains with the dark for day.",
    "I do protest my soul is debtor to thine eyes.",
    "When patience faints, let courage wear her name.",
    "Thou art the book wherein my errors learn to read.",
    "Let mercy be the steward of thy wrath.",
    "My thoughts, like rebels, clamour for a cause.",
    "He jests at scars that never felt a wound of mine.",
    "The world’s a stage ill paid for honest parts.",
    "I’ll coin my tears and pay my sorrows out.",
    "Make haste, sweet time, lest virtue come too late."
  ],
  "Technobabble": [
    "We refactored the microservice to decouple the async event bus.",
    "Polyfilled the WASM pipeline with a zero‑copy buffer allocator.",
    "Sharded the KV store and tuned the GC for low‑latency throughput.",
    "We containerized the legacy monolith behind a sidecar proxy.",
    "Backpressure semantics stabilized the reactive stream topology.",
    "We introduced idempotent retries with exponential backoff jitter.",
    "The circuit breaker tripped a brownout instead of a hard fail.",
    "Our schema evolution leverages backward‑compatible migrations.",
    "The vector index accelerated semantic retrieval by an order of magnitude.",
    "We deployed blue‑green with canary guards and automated rollback.",
    "SIMD intrinsics improved the hot path in the codec pipeline.",
    "We replaced mutex contention with lock‑free ring buffers.",
    "The scheduler coalesced timers to reduce wakeups on mobile.",
    "We enabled QUIC to mitigate head‑of‑line blocking over lossy links.",
    "A Bloom filter fronted the cache to cut miss penalties.",
    "We bootstrapped infra via declarative IaC and GitOps workflows.",
    "Vectorized ETL saturated the NIC before touching the CPU.",
    "We co‑located shards to exploit NUMA locality and cache residency.",
    "Adaptive sampling kept tracing overhead below one percent.",
    "We formalized invariants with property‑based tests and model checking."
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
