export default function CardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white px-[18px] py-4 shadow-[0_22px_50px_-34px_rgba(18,58,96,0.55)] ring-1 ring-black/5 xl:rounded-3xl xl:px-6 xl:py-6 2xl:px-8 2xl:py-7 3xl:px-10 3xl:py-9">
      <div className="relative mx-auto mb-3.5 grid h-[76px] w-[76px] place-items-center sm:h-[84px] sm:w-[84px] lg:h-[104px] lg:w-[104px] xl:h-[120px] xl:w-[120px] 2xl:h-[136px] 2xl:w-[136px] 3xl:h-[152px] 3xl:w-[152px]">
        <div className="h-full w-full skeleton rounded-2xl" />
      </div>
      <div className="h-[21px] w-3/5 skeleton rounded-full sm:h-[25px] lg:h-[26px] xl:h-[30px] 2xl:h-[34px] 3xl:h-[38px]" />
      <div className="mt-2 space-y-[7px]">
        <div className="h-[11px] w-full skeleton rounded-full" />
        <div className="h-[11px] w-4/5 skeleton rounded-full" />
      </div>
      <div className="mt-auto flex items-center gap-2 pt-4 xl:pt-6 3xl:pt-8">
        <div className="h-[11px] w-24 skeleton rounded-full" />
        <div className="h-[18px] w-[18px] skeleton rounded-full lg:h-5 lg:w-5 xl:h-6 xl:w-6 3xl:h-7 3xl:w-7" />
      </div>
    </div>
  );
}
