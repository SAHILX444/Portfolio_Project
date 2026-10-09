import { useStore } from './store';
import { EditableText, RemoveButton, btn } from './ui';
import { Tab, uid } from './data';

export function Header() {
  const { data, update, edit, setEdit, saveError } = useStore();
  return (
    <header className="bg-ink text-paper">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between gap-4">
        <p className="font-display text-xl">
          <EditableText value={data.greeting} onChange={(v) => update((d) => { d.greeting = v; })} label="Greeting message" />
        </p>
        <button className={btn} aria-pressed={edit} onClick={() => setEdit(!edit)}>
          {edit ? 'Done editing' : 'Edit site'}
        </button>
      </div>
      {saveError && (
        <p role="alert" className="bg-red-700 text-white text-sm px-6 py-2 text-center">
          Your changes could not be saved in this browser, usually because the images are too large. Remove an image or export a backup in Manage.
        </p>
      )}
    </header>
  );
}

export function TabMenu({ tabs, active, onSelect }: { tabs: Tab[]; active: string; onSelect: (id: string) => void }) {
  return (
    <nav aria-label="Main" className="bg-ink text-paper border-b border-white/10 sticky top-0 z-10">
      <ul className="mx-auto max-w-5xl px-6 flex gap-1 overflow-x-auto">
        {tabs.map((t) => (
          <li key={t.id}>
            <button
              onClick={() => onSelect(t.id)}
              aria-current={t.id === active ? 'page' : undefined}
              className={`px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${
                t.id === active ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              {t.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const { data, update, edit } = useStore();
  return (
    <footer className="bg-ink text-paper mt-auto">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {data.footer.map((f, i) => (
            <div key={f.id} className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <dt className="text-sm opacity-70">
                  <EditableText value={f.label} label="Label" onChange={(v) => update((d) => { d.footer[i].label = v; })} />
                </dt>
                <dd className="break-words">
                  <EditableText value={f.value} label={f.label} onChange={(v) => update((d) => { d.footer[i].value = v; })} />
                </dd>
              </div>
              <RemoveButton label={`Remove ${f.label}`} onClick={() => update((d) => { d.footer.splice(i, 1); })} />
            </div>
          ))}
        </dl>
        {edit && (
          <button className={`${btn} mt-6`} onClick={() => update((d) => { d.footer.push({ id: uid(), label: 'Label', value: 'Value' }); })}>
            Add detail
          </button>
        )}
        <p className="mt-8 text-sm opacity-60">© {new Date().getFullYear()} {data.name}</p>
      </div>
    </footer>
  );
}
