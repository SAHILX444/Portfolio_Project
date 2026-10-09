import { useStore } from './store';
import { EditableText, ImageSlot, RemoveButton, btn } from './ui';
import { uid } from './data';

export function Home() {
  const { data, update, edit } = useStore();
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-28">
        <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-8xl leading-tight break-words name-reveal">
          <EditableText value={data.name} label="Your name" onChange={(v) => update((d) => { d.name = v; })} />
        </h1>
        <p className="mt-6 text-lg max-w-xl opacity-80">
          <EditableText value={data.tagline} label="Tagline" onChange={(v) => update((d) => { d.tagline = v; })} />
        </p>
        <div className="mt-14 space-y-6 max-w-2xl">
          {data.thoughts.map((t, i) => (
            <div key={i} className="flex items-start gap-3">
              <blockquote className="flex-1 border-l-2 border-accent pl-4 italic text-xl md:text-2xl leading-relaxed">
                <EditableText multiline value={t} label={`Thought ${i + 1}`} onChange={(v) => update((d) => { d.thoughts[i] = v; })} />
              </blockquote>
              <RemoveButton label="Remove thought" onClick={() => update((d) => { d.thoughts.splice(i, 1); })} />
            </div>
          ))}
          {edit && (
            <button className={btn} onClick={() => update((d) => { d.thoughts.push('A new thought'); })}>
              Add thought
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Page({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-10">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export function About({ title }: { title: string }) {
  const { data, update, edit } = useStore();
  return (
    <Page title={title}>
      <div className="grid gap-10 md:grid-cols-[16rem_1fr]">
        {(data.photo || edit) && (
          <ImageSlot value={data.photo} alt={`Portrait of ${data.name}`} className="aspect-[4/5] w-full max-w-64" onChange={(v) => update((d) => { d.photo = v; })} />
        )}
        <div className={!data.photo && !edit ? 'md:col-span-2' : ''}>
          <p className="text-lg leading-relaxed max-w-prose">
            <EditableText multiline value={data.bio} label="About text" onChange={(v) => update((d) => { d.bio = v; })} />
          </p>
          <dl className="mt-10 border-l-2 border-accent pl-6 space-y-5">
            {data.details.map((f, i) => (
              <div key={f.id} className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <dt className="text-sm opacity-70">
                    <EditableText value={f.label} label="Label" onChange={(v) => update((d) => { d.details[i].label = v; })} />
                  </dt>
                  <dd className="text-lg">
                    <EditableText value={f.value} label={f.label} onChange={(v) => update((d) => { d.details[i].value = v; })} />
                  </dd>
                </div>
                <RemoveButton label={`Remove ${f.label}`} onClick={() => update((d) => { d.details.splice(i, 1); })} />
              </div>
            ))}
          </dl>
          {edit && (
            <button className={`${btn} mt-6`} onClick={() => update((d) => { d.details.push({ id: uid(), label: 'Label', value: 'Value' }); })}>
              Add detail
            </button>
          )}
        </div>
      </div>
    </Page>
  );
}

export function Achievements({ title }: { title: string }) {
  const { data, update, edit } = useStore();
  return (
    <Page title={title}>
      {edit && (
        <button
          className={`${btn} mb-8`}
          onClick={() => update((d) => { d.achievements.unshift({ id: uid(), title: 'New achievement', description: 'What happened and why it mattered.', date: String(new Date().getFullYear()) }); })}
        >
          Add achievement
        </button>
      )}
      {data.achievements.length === 0 && <p>No achievements yet. Switch on Edit site to add one.</p>}
      <ul className="grid gap-8 sm:grid-cols-2">
        {data.achievements.map((a, i) => (
          <li key={a.id} className="border border-slate-300 bg-white flex flex-col">
            <ImageSlot value={a.image} alt={a.title} className="aspect-[16/9] w-full" onChange={(v) => update((d) => { d.achievements[i].image = v; })} />
            <div className="p-5 flex-1 flex flex-col gap-2">
              <h3 className="font-display font-bold text-xl">
                <EditableText value={a.title} label="Title" onChange={(v) => update((d) => { d.achievements[i].title = v; })} />
              </h3>
              <p className="text-sm opacity-70">
                <EditableText value={a.date} label="Date" onChange={(v) => update((d) => { d.achievements[i].date = v; })} />
              </p>
              <p className="leading-relaxed">
                <EditableText multiline value={a.description} label="Description" onChange={(v) => update((d) => { d.achievements[i].description = v; })} />
              </p>
              {edit && (
                <div className="mt-2">
                  <RemoveButton label={`Remove ${a.title}`} onClick={() => update((d) => { d.achievements.splice(i, 1); })} />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Page>
  );
}

export function Experience({ title }: { title: string }) {
  const { data, update, edit } = useStore();
  return (
    <Page title={title}>
      {edit && (
        <button
          className={`${btn} mb-8`}
          onClick={() => update((d) => { d.experience.unshift({ id: uid(), role: 'Role', org: 'Organization', period: 'Period', description: 'What you did.' }); })}
        >
          Add experience
        </button>
      )}
      <ol className="border-l-2 border-accent pl-6 space-y-10">
        {data.experience.map((e, i) => (
          <li key={e.id} className="flex items-start gap-3">
            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="font-display font-bold text-xl">
                <EditableText value={e.role} label="Role" onChange={(v) => update((d) => { d.experience[i].role = v; })} />
              </h3>
              <p className="text-lg">
                <EditableText value={e.org} label="Organization" onChange={(v) => update((d) => { d.experience[i].org = v; })} />
              </p>
              <p className="text-sm opacity-70">
                <EditableText value={e.period} label="Period" onChange={(v) => update((d) => { d.experience[i].period = v; })} />
              </p>
              <p className="leading-relaxed max-w-prose pt-2">
                <EditableText multiline value={e.description} label="Description" onChange={(v) => update((d) => { d.experience[i].description = v; })} />
              </p>
            </div>
            <RemoveButton label={`Remove ${e.role}`} onClick={() => update((d) => { d.experience.splice(i, 1); })} />
          </li>
        ))}
      </ol>
    </Page>
  );
}

export function CustomPage({ tabId, title }: { tabId: string; title: string }) {
  const { data, update } = useStore();
  const i = data.tabs.findIndex((t) => t.id === tabId);
  const tab = data.tabs[i];
  return (
    <Page title={title}>
      <div className="grid gap-8 md:grid-cols-2">
        <ImageSlot value={tab.image} alt={title} className="aspect-[4/3] w-full" onChange={(v) => update((d) => { d.tabs[i].image = v; })} />
        <p className="text-lg leading-relaxed max-w-prose">
          <EditableText multiline value={tab.body ?? ''} label="Page text" placeholder="Write something" onChange={(v) => update((d) => { d.tabs[i].body = v; })} />
        </p>
      </div>
    </Page>
  );
}
