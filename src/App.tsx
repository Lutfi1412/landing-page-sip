import { useCallback, useEffect, useState } from "react";
import type { ModuleItem } from "./types";
import ModuleCard from "./components/ModuleCard";
import ModuleModal from "./components/ModuleModal";
import ErrorView from "./components/ErrorView";

export default function App() {
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState<ModuleItem | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    fetch("/data/modules.json")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d: ModuleItem[]) => setModules(d))
      .catch(() => setFailed(true));
  }, []);

  const path = window.location.pathname.replace(/\/+$/, "");
  if (path !== "" && path !== "/index.html")
    return <ErrorView title="Halaman tidak ditemukan" message="Alamat yang Anda buka tidak tersedia atau sedang dalam perbaikan." />;
  if (failed)
    return <ErrorView title="Data layanan gagal dimuat" message="Periksa berkas public/data/modules.json, lalu muat ulang halaman." />;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <img src="/assets/bg.jpg" alt="" className="absolute inset-x-0 top-0 h-[75vh] w-full object-cover object-top" />
      <div className="absolute inset-x-0 top-0 h-[75vh] bg-gradient-to-b from-primary/20 via-primary/70 to-primary" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        <header className="flex items-center justify-between gap-4">
          <img src="/assets/logo-sip.png" alt="SIP DJKN" className="h-11 animate-fade" />
          <img src="/assets/logo-kemenkeu.png" alt="Kementerian Keuangan Republik Indonesia" className="h-10 animate-fade" />
        </header>

        <main className="flex flex-1 flex-col justify-center py-14">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="animate-rise text-4xl font-extrabold leading-tight md:text-5xl" style={{ animationDelay: "100ms" }}>
              Sistem Informasi Penilaian DJKN
            </h1>
            <p className="mt-4 animate-rise text-lg font-medium text-accent" style={{ animationDelay: "220ms" }}>
              Pilih layanan yang Anda butuhkan
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {modules.map((m, i) => <ModuleCard key={m.modul} item={m} index={i} onOpen={setActive} />)}
          </div>
        </main>

        <footer className="flex justify-end">
          <img src="/assets/hubungi-kami.png" alt="Hubungi Kami Kemenkeu Prime 134" className="h-14 rounded-xl animate-fade transition hover:scale-105" />
        </footer>
      </div>

      {active && <ModuleModal item={active} onClose={close} />}
    </div>
  );
}
