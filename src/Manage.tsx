import { useRef } from 'react';
import { useStore } from './store';
import { btn } from './ui';
import { uid, SiteData } from './data';

const box = 'border border-slate-300 bg-white p-5 mb-8';

export function Manage({ title }: { title: string }) {
  const { data, update, replace, reset } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'site-data.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importJson = async (f: File) => {
    try {
      const j = JSON.parse(await f.text()) as Partial<SiteData>;
      if (!Array.isArray(j.tabs)) throw new Error('bad file');
      replace(j);
    } catch {
      alert('That file is not a valid site backup.');
    }
  };

  const move = (i: number, dir: -1 | 1) =>
    update((d) => {
      const j = i + dir;
      if (j < 0 || j >= d.tabs.length) return;
      [d.tabs[i], d.tabs[j]] = [d.tabs[j], d.tabs[i]];
    });

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-10">{title}</h2>

        <div className={box}>
          <h3 className="font-display font-bold text-xl mb-4">Colors</h3>
          <div className="flex flex-wrap gap-8">
            {(['ink', 'paper', 'accent'] as const).map((k) => (
              <label key={k} className="flex items-center gap-3">
                <input type="color" value={data.theme[k]} onChange={(e) => update((d) => { d.theme[k] = e.target.value; })} className="h-10 w-14 cursor-pointer" />
                {k === 'ink' ? 'Dark background' : k === 'paper' ? 'Light background' : 'Accent'}
              </label>
            ))}
          </div>
        </div>

        <div className={box}>
          <h3 className="font-display font-bold text-xl mb-4">Pages and tabs</h3>
          <ul className="space-y-3">
            {data.tabs.map((t, i) => (
              <li key={t.id} className="flex flex-wrap items-center gap-3">
                <input
                  value={t.label}
                  aria-label={`Name for ${t.label}`}
                  onChange={(e) => update((d) => { d.tabs[i].label = e.target.value; })}
                  className="border border-slate-400 px-2 py-1 w-44"
                />
                {t.kind !== 'manage' && (
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={t.visible} onChange={(e) => update((d) => { d.tabs[i].visible = e.target.checked; })} />
                    Show
                  </label>
                )}
                <button className={btn} onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move ${t.label} left`}>Move left</button>
                <button className={btn} onClick={() => move(i, 1)} disabled={i === data.tabs.length - 1} aria-label={`Move ${t.label} right`}>Move right</button>
                {t.kind === 'page' && (
                  <button className={btn} onClick={() => update((d) => { d.tabs.splice(i, 1); })}>Delete page</button>
                )}
              </li>
            ))}
          </ul>
          <button
            className={`${btn} mt-5`}
            onClick={() =>
              update((d) => {
                const id = uid();
                d.tabs.splice(d.tabs.length - 1, 0, { id, label: 'New page', kind: 'page', visible: true, body: '' });
              })
            }
          >
            Add page
          </button>
          <p className="text-sm mt-3 opacity-70">New pages open with Edit site on, so you can add text and an image.</p>
        </div>

        <div className={box}>
          <h3 className="font-display font-bold text-xl mb-2">Backup and publishing</h3>
          <p className="mb-4 max-w-prose">
            Edits are saved in this browser only. To make them the default for every visitor, download the backup, save it as
            <code className="mx-1">public/site-data.json</code> in the project and redeploy.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className={btn} onClick={exportJson}>Download backup</button>
            <button className={btn} onClick={() => fileRef.current?.click()}>Restore from backup</button>
            <input ref={fileRef} type="file" accept="application/json" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) importJson(f); e.target.value = ''; }} />
            <button className={btn} onClick={() => { if (confirm('Reset everything to the starting content?')) reset(); }}>Reset to defaults</button>
          </div>
        </div>
      </div>
    </section>
  );
}
