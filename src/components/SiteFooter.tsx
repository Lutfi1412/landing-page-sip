import { Phone, Globe, Link2 } from "lucide-react";
import Reveal from "./Reveal";
import {
  PhoneIcon,
  GlobeIcon,
  LinkSimpleHorizontalIcon,
} from "@phosphor-icons/react";

const contact = [
  { icon: PhoneIcon, label: "Call Center 134", href: "tel:134" },
  {
    icon: GlobeIcon,
    label: "kemenkeu-prime.kemenkeu.go.id",
    href: "https://kemenkeu-prime.kemenkeu.go.id",
  },
  {
    icon: LinkSimpleHorizontalIcon,
    label: "https://kemenkeu-prime.kemenkeu.go.id",
    href: "https://kemenkeu-prime.kemenkeu.go.id",
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-primary text-white">
      <Reveal className="shell grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-[minmax(240px,1.15fr)_minmax(0,1fr)_minmax(0,1.05fr)_auto] lg:items-start lg:gap-10 xl:gap-12 2xl:py-14 3xl:gap-16 3xl:py-16">
        <div>
          <img
            src="/assets/logo-kemenkeu.png"
            alt="Kementerian Keuangan Republik Indonesia"
            className="h-9 w-auto 2xl:h-11"
          />
          {/* <p className="mt-2.5 text-[11.5px] text-white/65">Direktorat Jenderal Kekayaan Negara</p> */}
        </div>

        <div>
          <h3 className="text-[13px] font-semibold 2xl:text-[15px]">Alamat</h3>
          <p className="mt-2.5 text-[11.5px] leading-[1.8] text-white/60 2xl:text-[13px]">
            Gedung Syafruddin Prawiranegara II
            <br />
            Jl. Lapangan Banteng Timur 2-4
            <br />
            Kecamatan Sawah Besar, Kota Jakarta Pusat,
            <br />
            Daerah Khusus Ibukota Jakarta 10710
          </p>
        </div>

        <div>
          <h3 className="text-[13px] font-semibold 2xl:text-[15px]">Hubungi Kami</h3>
          <ul className="mt-2.5 space-y-2.5">
            {contact.map(({ icon: Icon, label, href }) => (
              <li key={label + href}>
                <a
                  href={href}
                  className="flex items-center gap-2 text-[11.5px] text-white/70 transition-colors hover:text-accent 2xl:text-[13px]"
                >
                  <Icon
                    // className="h-4 w-4 shrink-0"
                    // strokeWidth={2}
                    // aria-hidden="true"

                    size={16}
                    color="#fbf9f9"
                    weight="bold"
                  />
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
