import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SiteData, defaultData } from './data';

const KEY = 'portfolio-data-v1';

type Store = {
  data: SiteData;
  update: (fn: (draft: SiteData) => void) => void;
  replace: (d: Partial<SiteData>) => void;
  reset: () => void;
  edit: boolean;
  setEdit: (b: boolean) => void;
  saveError: boolean;
};

const Ctx = createContext<Store | null>(null);

function loadSaved(): SiteData | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...defaultData, ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(() => loadSaved() ?? defaultData);
  const [edit, setEdit] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // First visit with no saved edits: use /site-data.json if you published one.
  useEffect(() => {
    if (localStorage.getItem(KEY)) return;
    fetch('/site-data.json')
      .then((r) => (r.ok && (r.headers.get('content-type') || '').includes('json') ? r.json() : null))
      .then((j) => j && setData({ ...defaultData, ...j }))
      .catch(() => {});
  }, []);

  const persist = (d: SiteData) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(d));
      setSaveError(false);
    } catch {
      setSaveError(true); // usually: images too large for browser storage
    }
  };

  const replace = (d: Partial<SiteData>) => {
    const next = { ...defaultData, ...d } as SiteData;
    setData(next);
    persist(next);
  };

  const update: Store['update'] = (fn) => {
    const draft: SiteData = JSON.parse(JSON.stringify(data));
    fn(draft);
    setData(draft);
    persist(draft);
  };

  const reset = () => {
    localStorage.removeItem(KEY);
    setData(defaultData);
    setSaveError(false);
  };

  return <Ctx.Provider value={{ data, update, replace, reset, edit, setEdit, saveError }}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useStore must be used inside StoreProvider');
  return c;
}
