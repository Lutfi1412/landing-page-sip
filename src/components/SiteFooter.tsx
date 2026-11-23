import { Phone, Globe, Link2 } from "lucide-react";
import Reveal from "./Reveal";

const contact = [
  { icon: Phone, label: "Call Center 134", href: "tel:134" },
  { icon: Globe, label: "kemenkeu-prime.kemenkeu.go.id", href: "https://kemenkeu-prime.kemenkeu.go.id" },
  { icon: Link2, label: "https://kemenkeu-prime.kemenkeu.go.id", href: "https://kemenkeu-prime.kemenkeu.go.id" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-primary text-white">
      <Reveal className="mx-auto grid w-full max-w-[1180px] gap-8 px-5 py-10 sm:px-8 md:grid-cols-2 lg:grid-cols-[minmax(240px,1.15fr)_minmax(0,1fr)_minmax(0,1.05fr)_auto] lg:items-start lg:gap-10">
        <div>
          <img
            src="/assets/logo-kemenkeu.png"
            alt="Kementerian Keuangan Republik Indonesia"
            className="h-9 w-auto"
          />
          <p className="mt-2.5 text-[11.5px] text-white/65">Direktorat Jenderal Kekayaan Negara</p>
        </div>

        <div>
          <h3 className="text-[13px] font-semibold">Alamat</h3>
          <p className="mt-2.5 text-[11.5px] leading-[1.8] text-white/60">
            Gedung Syafruddin Prawiranegara II<br />
            Jl. Lapangan Banteng Timur 2-4<br />
            Kecamatan Sawah Besar, Kota Jakarta Pusat,<br />
            Daerah Khusus Ibukota Jakarta 10710
          </p>
        </div>

        <div>
          <h3 className="text-[13px] font-semibold">Hubungi Kami</h3>
          <ul className="mt-2.5 space-y-2.5">
            {contact.map(({ icon: Icon, label, href }) => (
              <li key={label + href}>
                <a
                  href={href}
                  className="flex items-center gap-2 text-[11.5px] text-white/70 transition-colors hover:text-accent"
                >
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                  <span className="truncate">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:justify-self-end">
          <a
            href="https://kemenkeu-prime.kemenkeu.go.id"
            className="inline-flex rounded-2xl bg-white p-2 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <img
              src="/assets/hubungi-kami.png"
              alt="Hubungi Kami Kemenkeu Prime 134"
              className="h-12 w-auto"
            />
          </a>
        </div>
      </Reveal>
    </footer>
  );
}
