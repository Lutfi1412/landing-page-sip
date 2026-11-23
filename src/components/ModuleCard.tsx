import { hasLink, type ModuleItem } from "../types";

interface Props { item: ModuleItem; index: number; onOpen: (m: ModuleItem) => void; }

const cls =
  "group relative flex flex-col items-center overflow-hidden rounded-3xl bg-white px-8 pb-10 pt-8 text-center text-primary shadow-xl shadow-black/25 transition duration-300 animate-rise cursor-pointer " +
  "hover:-translate-y-2 hover:bg-soft focus-visible:-translate-y-2 focus-visible:bg-soft focus-visible:outline-4 focus-visible:outline-accent";

export default function ModuleCard({ item, index, onOpen }: Props) {
  const direct = hasLink(item.link);
  const inner = (
    <>
      {item.ikon && <img src={item.ikon} alt="" className="h-36 w-36 object-contain group-hover:animate-bob group-focus-visible:animate-bob" />}
      <h2 className="mt-4 text-2xl font-bold transition-colors group-hover:text-brand group-focus-visible:text-brand">{item.modul}</h2>
      {item.deskripsi && <p className="mt-2 text-sm leading-relaxed text-primary/70">{item.deskripsi}</p>}
      <span className="mt-5 text-sm font-semibold text-brand">{direct ? "Buka layanan" : "Lihat menu"}</span>
      <span className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
    </>
  );
  const style = { animationDelay: `${350 + index * 140}ms` };
  return direct
    ? <a href={item.link!} className={cls} style={style}>{inner}</a>
    : <button type="button" onClick={() => onOpen(item)} className={cls} style={style}>{inner}</button>;
}
