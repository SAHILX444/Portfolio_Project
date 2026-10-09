import { CSSProperties, useEffect, useState } from 'react';
import { useStore } from './store';
import { Footer, Header, TabMenu } from './Chrome';
import { About, Achievements, CustomPage, Experience, Home } from './Sections';
import { Manage } from './Manage';

export default function App() {
  const { data, setEdit } = useStore();
  const [activeId, setActiveId] = useState(() => location.hash.slice(1) || 'home');

  const tabs = data.tabs.filter((t) => t.visible || t.kind === 'manage');
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  useEffect(() => {
    const onHash = () => setActiveId(location.hash.slice(1) || 'home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const select = (id: string) => {
    location.hash = id;
    setActiveId(id);
    window.scrollTo({ top: 0 });
    // Pages added from Manage are meant to be filled in right away.
    const t = data.tabs.find((x) => x.id === id);
    if (t?.kind === 'page' && !t.body) setEdit(true);
  };

  const theme = { '--ink': data.theme.ink, '--paper': data.theme.paper, '--accent': data.theme.accent } as CSSProperties;

  return (
    <div style={theme} className="min-h-screen flex flex-col bg-paper text-ink font-serif">
      <Header />
      <TabMenu tabs={tabs} active={active.id} onSelect={select} />
      <main className="flex-1">
        {active.kind === 'home' && <Home />}
        {active.kind === 'about' && <About title={active.label} />}
        {active.kind === 'achievements' && <Achievements title={active.label} />}
        {active.kind === 'experience' && <Experience title={active.label} />}
        {active.kind === 'page' && <CustomPage tabId={active.id} title={active.label} />}
        {active.kind === 'manage' && <Manage title={active.label} />}
      </main>
      <Footer />
    </div>
  );
}
