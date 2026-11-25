import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { hasLink, type ModuleItem } from "../types";
import ArrowUpRightIcon from "./ArrowUpRight";

interface Props {
  item: ModuleItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const row =
  "group flex w-full items-center gap-3 rounded-xl border border-primary/12 bg-white p-2.5 transition duration-300 " +
  "hover:-translate-y-0.5 hover:border-brand/30 hover:bg-soft/60 hover:shadow-[0_16px_35px_-24px_rgba(18,58,96,0.55)] " +
  "focus-visible:border-brand/40 focus-visible:bg-soft/60 focus-visible:outline-none";

const rowDisabled =
  "group flex w-full items-center gap-3 rounded-xl border border-primary/5 bg-soft/40 p-2.5 text-primary/45";

export default function ModuleModal({ item, open, onOpenChange }: Props) {
  const children = item.child ?? [];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-primary/55 backdrop-blur-md data-[state=open]:animate-fade data-[state=closed]:animate-veil-out" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[412px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[20px] bg-white p-5 shadow-[0_40px_95px_-28px_rgba(4,18,48,0.8)] focus:outline-none data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out xl:max-w-[440px] xl:p-6 3xl:max-w-[500px] 3xl:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-[18px] font-bold leading-tight text-primary">
                {item.modul}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-[12px] text-primary/55">
                Pilih aplikasi yang ingin anda akses
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Tutup"
              className="-mr-1.5 -mt-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-primary/70 transition hover:bg-soft hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <X className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
            </Dialog.Close>
          </div>

          {children.length === 0 && (
            <p className="mt-4 rounded-xl bg-soft p-3.5 text-[12.5px] text-primary/70">
              Belum ada aplikasi pada modul ini.
            </p>
          )}

          <ul className="mt-4 space-y-2.5">
            {children.map((c, i) => {
              const inner = (
                <>
                  {c.gambar && (
                    <img
                      src={c.gambar}
                      alt=""
                      className="h-[52px] w-[52px] shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px] font-bold leading-snug text-primary">
                      {c.nama}
                    </span>
                    {c.deskripsi && (
                      <span className="mt-0.5 block text-[11.5px] leading-snug text-primary/55">
                        {c.deskripsi}
                      </span>
                    )}
                  </span>
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-primary transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </span>
                </>
              );

              return (
                <li
                  key={c.nama}
                  className="animate-row-in"
                  style={{ animationDelay: `${60 + i * 55}ms` }}
                >
                  {hasLink(c.link) ? (
                    <a href={c.link} className={row}>
                      {inner}
                    </a>
                  ) : (
                    <div aria-disabled="true" className={rowDisabled}>
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
