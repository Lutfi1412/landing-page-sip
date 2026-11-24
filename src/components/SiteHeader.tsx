export default function SiteHeader() {
  return (
    <header className="animate-drop pt-6 sm:pt-10">
      <div className="flex items-center justify-between gap-4 rounded-full border border-white/40 bg-white/10 px-4 py-1.5 shadow-[0_18px_45px_-22px_rgba(0,0,0,0.75)] backdrop-blur-md sm:px-5 sm:py-2">
        <img
          src="/assets/logo-kemenkeu.png"
          alt="Kementerian Keuangan Republik Indonesia"
          className="h-7 sm:h-10 w-auto"
        />
        <img
          src="/assets/logo-sip.png"
          alt="SIP DJKN"
          className="h-7 sm:h-10 w-auto"
        />
      </div>
    </header>
  );
}
