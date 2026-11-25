import { hasLink, type ModuleItem } from "../types";
import ArrowUpRightIcon from "./ArrowUpRight";

interface Props {
  item: ModuleItem;
  onOpen: (m: ModuleItem) => void;
}

const base =
  "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl px-[18px] py-4 text-left outline-none xl:rounded-3xl xl:px-6 xl:py-6 2xl:px-8 2xl:py-7 3xl:px-10 3xl:py-9 " +
  "bg-white text-primary ring-1 ring-black/5 shadow-[0_22px_50px_-34px_rgba(18,58,96,0.55)] " +
  "transition-[translate,box-shadow,background-color,color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "hover:-translate-y-2 hover:bg-primary hover:text-white hover:ring-white/10 hover:shadow-[0_38px_68px_-30px_rgba(18,58,96,0.85)] " +
  "active:-translate-y-2 active:bg-primary active:text-white " +
  "focus-visible:-translate-y-2 focus-visible:bg-primary focus-visible:text-white focus-visible:outline-4 focus-visible:outline-brand";

export default function ModuleCard({ item, onOpen }: Props) {
  const direct = hasLink(item.link);
  const cta = direct ? "Buka Aplikasi" : "Lihat Aplikasi";

  const body = (
    <>
      <div className="relative mx-auto mb-3.5 grid h-[76px] w-[76px] place-items-center sm:h-[84px] sm:w-[84px] lg:h-[104px] lg:w-[104px] xl:h-[120px] xl:w-[120px] 2xl:h-[136px] 2xl:w-[136px] 3xl:h-[152px] 3xl:w-[152px]">
        <span
          aria-hidden
          className="absolute inset-x-3 bottom-1.5 h-6 rounded-[50%] bg-black/25 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100 group-focus-visible:opacity-100"
        />
        {item.ikon && (
          <img
            src={item.ikon}
            alt=""
            className="relative h-full w-full object-contain transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.06] group-active:-translate-y-1.5 group-active:scale-[1.06]"
          />
        )}
      </div>

      <h2 className="text-[21px] font-extrabold leading-tight tracking-[-0.015em] sm:text-[25px] lg:text-[26px] xl:text-[30px] 2xl:text-[34px] 3xl:text-[38px]">
        {item.modul}
      </h2>

      {item.deskripsi && (
        <p className="mt-2 text-[12px] leading-[1.7] text-primary/60 transition-colors duration-500 group-hover:text-white/75 group-active:text-white/75 md:text-[10.5px] md:leading-[1.75] lg:text-[13px] lg:leading-[1.7] xl:mt-3 xl:text-[14px] 2xl:text-[15px] 3xl:text-[17px]">
          {item.deskripsi}
        </p>
      )}

      <div className="mt-auto flex items-center gap-2 pt-4 xl:pt-6 3xl:pt-8">
        <span className="text-[11.5px] font-semibold text-brand transition-colors duration-500 group-hover:text-accent group-active:text-accent lg:text-[13px] xl:text-[15px] 2xl:text-[16px] 3xl:text-[18px]">
          {cta}
        </span>
        <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-brand text-white transition duration-300 ease-out group-hover:scale-125 group-hover:bg-accent group-hover:text-primary group-active:bg-accent group-active:text-primary lg:h-5 lg:w-5 xl:h-6 xl:w-6 3xl:h-7 3xl:w-7">
          <ArrowUpRightIcon className="h-2 w-2 transition duration-300 group-hover:-translate-y-px group-hover:translate-x-px lg:h-2.5 lg:w-2.5 xl:h-3 xl:w-3 3xl:h-3.5 3xl:w-3.5" />
        </span>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100"
      />
    </>
  );

  return direct ? (
    <a href={item.link!} className={base}>
      {body}
    </a>
  ) : (
    <button type="button" onClick={() => onOpen(item)} className={base}>
      {body}
    </button>
  );
}
