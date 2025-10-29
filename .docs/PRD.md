# Product Requirements Document (PRD)
## Placeholder Text Generator Web App

**Author:** Paul Cunningham  
**Project Type:** Web App (Vite + React + MUI, Typescript)  
**Date:** 2025-10-29  
**AI Agent:** Junie (WebStorm Agentic AI)

---

## 1. Overview

This project defines a web application that generates **placeholder text** in various styles — such as *Academese*, *Corporate Speak*, *Fedspeak*, *Gibberish*, *Lorum Ipsum*, *Officialese*, *Pseudoscience*, *Psychobabble*, *Shakespeare*, and *Technobabble*.  

The app is designed to be **fully client-side** — **no external network calls** will be made. All data, models, and algorithms should run locally within the browser.

Users will be able to:
- Select a language/style of text generation.
- Adjust parameters (e.g. sentence length, complexity, number of paragraphs).
- Generate realistic, statistically varied text using **Markov chains** or similar language models.
- Copy generated text with a single click.
- Have their preferences for each language remembered locally via **localStorage**.

The app will have a **modern, professional UI** using **Material UI (MUI)** components.

---

## 2. Tech Stack

| Component | Technology |
|------------|-------------|
| Frontend Framework | **Vite + React + MUI** |
| Language | **TypeScript** |
| Storage | **LocalStorage** |
| Text Generation | **Markov chain** + optional **n-gram** or **probabilistic grammar** models |
| Build Tool | **pnpm** or **npm** |
| Testing | **Vitest** + **React Testing Library** |
| UI Styling | **MUI v6** (using theming and light/dark mode) |

---

## 3. Core Features

### 3.1 Language Selection
Users can choose from a predefined list of “languages” or text styles:

1. **Academese**  
2. **Corporate Speak**  
3. **Fedspeak**  
4. **Gibberish**  
5. **Lorum Ipsum**  
6. **Officialese**  
7. **Pseudoscience**  
8. **Psychobabble**  
9. **Shakespeare**  
10. **Technobabble**

Each style should use a distinct local corpus (stored as JSON or embedded within the app).  
Markov chains will be trained on each corpus to generate coherent random text.

> **Implementation Note:**  
> Each language module can export a small dataset and pre-computed frequency tables for speed.

---

### 3.2 Parameter Controls
Users can adjust generation parameters via **MUI sliders and number inputs**:

| Parameter | Description | Default | Range |
|------------|--------------|----------|--------|
| Sentence Length | Average number of words per sentence | 12 | 5 – 30 |
| Sentence Complexity | Adjusts grammar or Markov order (e.g. 1–3) | 2 | 1 – 5 |
| Number of Paragraphs | Number of paragraphs to output | 3 | 1 – 10 |

These parameters directly influence the output algorithm:
- **Sentence Length** affects termination probability.
- **Complexity** adjusts n-gram depth or word diversity.
- **Paragraphs** determines total output structure.

Parameter values should persist in **localStorage** for each selected language.

---

### 3.3 Text Generation Engine

#### Requirements:
- Must generate text **without any network or API calls**.
- Use **Markov chains** (order configurable by “Sentence Complexity” slider).
- Optionally implement alternative or hybrid approaches:
  - **N-gram models** (probabilistic next-word prediction)
  - **CFG (context-free grammar)** templates for structure realism
  - **Random walk** approach for styles like “Gibberish” or “Technobabble”

#### Structure:
```ts
interface GenerationOptions {
  language: string;
  sentenceLength: number;
  complexity: number;
  paragraphs: number;
}
```

#### Output:
A string containing multiple paragraphs separated by blank lines.

---

### 3.4 UI Layout

#### Components
- **Header** – app title (“Placeholder Text Generator”) and dark/light mode toggle.
- **LanguageSelector** – dropdown with 10 language options.
- **ParameterPanel** – sliders + labels for each parameter.
- **GenerateButton** – triggers text generation.
- **OutputArea** – scrollable text field (MUI `Paper` or `TextField` with monospaced font).
- **CopyButton** – copies output to clipboard using `navigator.clipboard.writeText()`.

#### Design Goals
- Clean, modern look (Material 3 style).
- Responsive layout (works on mobile and desktop).
- Keyboard and accessibility support.

---

### 3.5 Local Storage Behavior

Each language should have its own saved parameters:
```json
{
  "Academese": { "sentenceLength": 12, "complexity": 2, "paragraphs": 3 },
  "Corporate Speak": { ... }
}
```

On app load:
- Restore parameters from localStorage for the selected language.
- Fall back to defaults if no record exists.

On parameter change:
- Save updated settings to localStorage.

---

### 3.6 Copy to Clipboard

- Button labeled “Copy Text”.
- Uses `navigator.clipboard.writeText()`.
- Displays a **Snackbar (MUI)** notification on success: “Copied to clipboard!”

---

## 4. Non-Functional Requirements

| Category | Requirement |
|-----------|-------------|
| Performance | Text generation should complete within <500 ms for up to 10 paragraphs. |
| Offline Operation | App must run entirely offline; no external data calls. |
| Accessibility | WCAG AA compliance (focus, contrast, ARIA labels). |
| Responsiveness | Works on mobile (≤480 px), tablet, and desktop. |
| UX | Persistent parameters; clear visual hierarchy. |
| Security | No external network calls or user data uploads. |

---

## 5. Setup Block (for Junie)

```bash
# Setup Block — to be executed in WebStorm by Junie

# Create project
pnpm create vite . --template react-ts

# Install dependencies
pnpm install @mui/material @emotion/react @emotion/styled

# (optional) Install testing libs
pnpm install -D vitest @testing-library/react @testing-library/jest-dom

# Ensure Junie reads /.docs/PRD.md
```

---

## 6. Getting Started

1. **Read this PRD** to understand project scope.
2. Create components incrementally:
   - `AppLayout.tsx`
   - `LanguageSelector.tsx`
   - `ParameterPanel.tsx`
   - `OutputArea.tsx`
   - `CopyButton.tsx`
3. Implement `TextGenerator.ts` (Markov engine).
4. Wire up `localStorage` hooks.
5. Test parameter persistence and copy-to-clipboard.
6. Style using MUI Theme (light/dark).

---

## 7. Testing

| Test Type | Tools | Example Tests |
|------------|--------|----------------|
| Unit Tests | Vitest + RTL | “Generates correct number of paragraphs” |
| UI Tests | React Testing Library | “Slider changes update displayed value” |
| Integration | Vitest | “Changing parameters affects output” |
| Copy Action | Manual + Jest mock | “Clipboard contains expected text” |
| LocalStorage | Mock test | “Restores previous settings per language” |

**Performance Testing:**  
Ensure that generating 10 paragraphs of “Academese” completes in under 0.5 s.

**UX Testing:**  
Check that sliders are intuitive, the design looks balanced, and dark mode toggles correctly.

---

## 8. Future Enhancements (Stretch Goals)

- Add export to `.txt` or `.md` file.  
- Add “Randomize” button for quick output.  
- Add custom language corpus upload (still local-only).  
- Add tooltips explaining each “language.”  
- Add real-time preview as parameters are changed.

---

## 9. Deliverables

- Complete Vite + React + TypeScript codebase.
- Local-only Markov text generator for 10 language types.
- Persistent parameter configuration via localStorage.
- Fully responsive, modern MUI interface.
- Test suite with basic coverage.

---

**End of PRD**
