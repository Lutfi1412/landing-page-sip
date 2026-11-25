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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[300px] overflow-hidden sm:h-[360px] lg:h-[430px] xl:h-[470px] 2xl:h-[520px] 3xl:h-[560px]">
        <img
          src="/assets/bg.jpg"
          alt=""
          className="animate-hero h-full w-full object-cover object-[50%_38%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent via-white/70 to-white" />
      </div>

      <div className="shell relative flex-1">
        <SiteHeader />

        <section className="pt-8 pb-4 sm:pt-9 sm:pb-5 xl:pt-12 xl:pb-7 3xl:pt-14">
          <h1
            className="animate-rise text-[22px] font-extrabold leading-[1.18] tracking-[-0.02em] text-white text-shadow-hero sm:text-[28px] lg:text-[34px] xl:text-[38px] 2xl:text-[44px] 3xl:text-[48px]"
            style={{ animationDelay: "60ms" }}
          >
            Selamat Datang di Sistem Informasi Penilaian
          </h1>
          <h2
            className="animate-rise mt-0.5 text-[19px] font-normal leading-[1.22] tracking-[-0.01em] text-white/95 text-shadow-hero sm:text-[25px] lg:text-[30px] xl:text-[33px] 2xl:text-[38px] 3xl:text-[42px]"
            style={{ animationDelay: "150ms" }}
          >
            Direktorat Jenderal Kekayaan Negara
          </h2>
          <p
            className="animate-rise mt-3 max-w-[640px] text-[13px] leading-relaxed text-white/85 text-shadow-hero sm:text-[16px] lg:text-[17px] xl:max-w-[720px] xl:text-[18px] 2xl:max-w-[780px] 2xl:text-[19px] 3xl:max-w-[860px] 3xl:text-[21px]"
            style={{ animationDelay: "250ms" }}
          >
            Akses layanan dan aplikasi sistem informasi penilaian DJKN melalui satu portal
          </p>
        </section>

        <section className="grid items-stretch gap-5 pb-12 sm:gap-7 md:grid-cols-3 md:gap-11 xl:gap-12 2xl:gap-16 3xl:gap-20">
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
