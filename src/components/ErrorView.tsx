interface Props { title: string; message: string; }

export default function ErrorView({ title, message }: Props) {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-12 text-center text-primary">
      <div className="animate-pop">
        <img src="/assets/error.png" alt="" className="mx-auto w-full max-w-sm" />
        <h1 className="mt-4 text-3xl font-extrabold">{title}</h1>
        <p className="mx-auto mt-3 max-w-md text-primary/70">{message}</p>
        <a href="/" className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-bold text-primary transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-4 focus-visible:outline-brand">
          Kembali ke beranda
        </a>
      </div>
    </main>
  );
}
