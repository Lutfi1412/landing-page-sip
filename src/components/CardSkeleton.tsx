export default function CardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white px-[18px] py-4 shadow-[0_22px_50px_-34px_rgba(18,58,96,0.55)] ring-1 ring-black/5">
      <div className="relative mx-auto mb-3.5 grid h-[76px] w-[76px] place-items-center sm:h-[84px] sm:w-[84px] lg:h-[104px] lg:w-[104px]">
        <div className="h-full w-full skeleton rounded-2xl" />
      </div>
      <div className="h-[21px] w-3/5 skeleton rounded-full sm:h-[25px] lg:h-[26px]" />
      <div className="mt-2 space-y-[7px]">
        <div className="h-[11px] w-full skeleton rounded-full" />
        <div className="h-[11px] w-4/5 skeleton rounded-full" />
      </div>
      <div className="mt-auto flex items-center gap-2 pt-4">
        <div className="h-[11px] w-24 skeleton rounded-full" />
        <div className="h-[18px] w-[18px] skeleton rounded-full lg:h-5 lg:w-5" />
      </div>
    </div>
  );
}
