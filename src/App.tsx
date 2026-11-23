import { useCallback, useEffect, useState } from "react";
import type { ModuleItem } from "./types";
import ModuleCard from "./components/ModuleCard";
import ModuleModal from "./components/ModuleModal";
import CardSkeleton from "./components/CardSkeleton";
import ErrorView from "./components/ErrorView";
import Reveal from "./components/Reveal";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export default function App() {
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState<ModuleItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback((m: ModuleItem) => {
    setActive(m);
    setModalOpen(true);
  }, []);

  const handleModalOpenChange = useCallback((open: boolean) => {
    setModalOpen(open);
    if (!open) window.setTimeout(() => setActive(null), 200);
  }, []);

  useEffect(() => {
    fetch("/data/modules.json")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d: ModuleItem[]) => setModules(d))
      .catch(() => setFailed(true));
  }, []);

  const path = window.location.pathname.replace(/\/+$/, "");
  if (path !== "" && path !== "/index.html")
    return (
      <ErrorView
        title="Halaman tidak ditemukan"
        message="Alamat yang Anda buka tidak tersedia atau sedang dalam perbaikan."
      />
    );
  if (failed)
    return (
      <ErrorView
        title="Data layanan gagal dimuat"
        message="Periksa berkas public/data/modules.json, lalu muat ulang halaman."
      />
    );

  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[300px] overflow-hidden sm:h-[360px] lg:h-[430px]">
        <img
          src="/assets/bg.jpg"
          alt=""
          className="animate-hero h-full w-full object-cover object-[50%_38%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent via-white/70 to-white" />
      </div>

      <div className="relative mx-auto w-full max-w-[1180px] flex-1 px-5 sm:px-8">
        <SiteHeader />

        <section className="pt-8 pb-4 sm:pt-9 sm:pb-5">
          <h1
            className="animate-rise text-[22px] font-extrabold leading-[1.18] tracking-[-0.02em] text-white text-shadow-hero sm:text-[28px] lg:text-[34px]"
            style={{ animationDelay: "60ms" }}
          >
            Selamat Datang di Sistem Informasi Penilaian
          </h1>
          <h2
            className="animate-rise mt-0.5 text-[19px] font-normal leading-[1.22] tracking-[-0.01em] text-white/95 text-shadow-hero sm:text-[25px] lg:text-[30px]"
            style={{ animationDelay: "150ms" }}
          >
            Direktorat Jenderal Kekayaan Negara
          </h2>
          <p
            className="animate-rise mt-3 max-w-[640px] text-[13px] leading-relaxed text-white/85 text-shadow-hero sm:text-[16px] lg:text-[17px]"
            style={{ animationDelay: "250ms" }}
          >
            Akses layanan dan aplikasi sistem informasi penilaian DJKN melalui satu portal
          </p>
        </section>

        <section className="grid items-stretch gap-5 pb-12 sm:gap-7 md:grid-cols-3 md:gap-11">
          {modules.length === 0
            ? [0, 1, 2].map((i) => (
                <Reveal key={i} delay={i * 110}>
                  <CardSkeleton />
                </Reveal>
              ))
            : modules.map((m, i) => (
                <Reveal key={m.modul} delay={i * 110} className="h-full">
                  <ModuleCard item={m} onOpen={openModal} />
                </Reveal>
              ))}
        </section>
      </div>

      <SiteFooter />

      {active && (
        <ModuleModal item={active} open={modalOpen} onOpenChange={handleModalOpenChange} />
      )}
    </div>
  );
}
