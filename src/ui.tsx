import { useStore } from './store';

export const btn =
  'px-3 py-1.5 text-sm rounded-sm border border-current hover:bg-accent hover:text-ink hover:border-accent transition-colors';

type TextProps = {
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  label?: string;
};

/** Plain text when viewing, an input when "Edit site" is on. */
export function EditableText({ value, onChange, multiline, className = '', placeholder, label }: TextProps) {
  const { edit } = useStore();
  if (!edit) return <span className={className} style={{ whiteSpace: 'pre-line' }}>{value}</span>;
  const common = {
    value,
    placeholder,
    'aria-label': label ?? placeholder ?? 'Edit text',
    style: { color: '#0f172a', letterSpacing: 'normal' },
    className: `w-full bg-white border border-dashed border-slate-400 rounded-sm px-2 py-1 font-serif not-italic text-base`,
  };
  return multiline ? (
    <textarea {...common} rows={4} onChange={(e) => onChange(e.target.value)} />
  ) : (
    <input {...common} onChange={(e) => onChange(e.target.value)} />
  );
}

export async function fileToDataUrl(file: File, max = 900): Promise<string> {
  const url = URL.createObjectURL(file);
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = url;
  });
  const s = Math.min(1, max / Math.max(img.width, img.height));
  const c = document.createElement('canvas');
  c.width = Math.round(img.width * s);
  c.height = Math.round(img.height * s);
  c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height);
  URL.revokeObjectURL(url);
  return c.toDataURL('image/jpeg', 0.82);
}

type ImgProps = { value?: string; onChange: (v?: string) => void; alt: string; className?: string };

/** Shows an image; in edit mode lets you upload, change or remove it. Renders nothing if empty and not editing. */
export function ImageSlot({ value, onChange, alt, className = '' }: ImgProps) {
  const { edit } = useStore();
  if (!value && !edit) return null;
  return (
    <div className={`relative overflow-hidden bg-slate-200 ${className}`}>
      {value ? (
        <img src={value} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full min-h-32 grid place-items-center text-sm text-slate-600">No image yet</div>
      )}
      {edit && (
        <div className="absolute bottom-2 left-2 flex gap-2 text-xs" style={{ color: '#0f172a' }}>
          <label className="cursor-pointer bg-white px-2 py-1 rounded-sm shadow focus-within:outline focus-within:outline-2">
            {value ? 'Change image' : 'Upload image'}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) onChange(await fileToDataUrl(f));
                e.target.value = '';
              }}
            />
          </label>
          {value && (
            <button className="bg-white px-2 py-1 rounded-sm shadow" onClick={() => onChange(undefined)}>
              Remove image
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function RemoveButton({ onClick, label }: { onClick: () => void; label: string }) {
  const { edit } = useStore();
  if (!edit) return null;
  return (
    <button onClick={onClick} className={`${btn} shrink-0`} aria-label={label}>
      Remove
    </button>
  );
}
