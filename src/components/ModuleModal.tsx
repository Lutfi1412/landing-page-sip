import { useEffect, useRef } from "react";
import { hasLink, type ModuleItem } from "../types";

interface Props { item: ModuleItem; onClose: () => void; }

const row =
  "group flex w-full items-center gap-4 rounded-2xl bg-soft p-3 text-left text-primary transition duration-200 " +
  "hover:bg-brand hover:text-white focus-visible:bg-brand focus-visible:text-white focus-visible:outline-none active:bg-brand active:text-white";

export default function ModuleModal({ item, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const children = item.child ?? [];

  return (
    <div role="dialog" aria-modal="true" aria-label={item.modul} onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-primary/70 p-4 backdrop-blur-sm animate-fade">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl animate-pop">
        <div className="mb-5 flex items-center gap-4">
          {item.ikon && <img src={item.ikon} alt="" className="h-14 w-14 object-contain" />}
          <h2 className="flex-1 text-2xl font-bold text-primary">{item.modul}</h2>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Tutup"
            className="grid h-10 w-10 place-items-center rounded-full text-2xl text-primary transition hover:bg-soft hover:text-brand focus-visible:outline-4 focus-visible:outline-accent">
            ×
          </button>
        </div>

        {children.length === 0 && <p className="rounded-2xl bg-soft p-4 text-primary/70">Belum ada menu pada modul ini.</p>}

        <ul className="space-y-2">
          {children.map((c) => {
            const body = (
              <>
                {c.gambar && <img src={c.gambar} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />}
                <span className="flex-1">
                  <span className="block font-semibold">{c.nama}</span>
                  {c.deskripsi && <span className="block text-sm opacity-70">{c.deskripsi}</span>}
                </span>
                <span aria-hidden className="pr-2 text-xl transition-transform group-hover:translate-x-1">›</span>
              </>
            );
            return (
              <li key={c.nama}>
                {hasLink(c.link)
                  ? <a href={c.link} className={row}>{body}</a>
                  : <div aria-disabled="true" className="flex w-full items-center gap-4 rounded-2xl bg-soft/60 p-3 text-primary/50">{body}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
