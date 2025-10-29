import { useEffect, useMemo, useState } from 'react';

export type Params = {
  sentenceLength: number;
  complexity: number;
  paragraphs: number;
};

export const DEFAULT_PARAMS: Params = {
  sentenceLength: 12,
  complexity: 2,
  paragraphs: 3,
};

const STORAGE_KEY = 'placeholder-generator.params';

type StoreShape = Record<string, Params>; // keyed by language name

function readStore(): StoreShape {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw) as StoreShape;
    return obj ?? {};
  } catch {
    return {};
  }
}

function writeStore(store: StoreShape) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore
  }
}

export function usePersistentParams(language: string) {
  const initial = useMemo(() => {
    const store = readStore();
    return store[language] ?? DEFAULT_PARAMS;
  }, [language]);

  const [params, setParams] = useState<Params>(initial);

  useEffect(() => {
    // when language changes, refresh from store
    const store = readStore();
    setParams(store[language] ?? DEFAULT_PARAMS);
  }, [language]);

  useEffect(() => {
    const store = readStore();
    store[language] = params;
    writeStore(store);
  }, [language, params]);

  return { params, setParams } as const;
}
