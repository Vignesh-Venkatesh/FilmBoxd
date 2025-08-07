export default function LoadingMovie() {
  return (
    <div className="w-[950px] mx-auto translate-y-100 flex justify-between">
      <div className="skeleton w-[230px] h-[345px]"></div>

      <div className="w-[670px]">
        <div className="skeleton h-12 rounded"></div>

        <div className="flex justify-between mt-5">
          <div className="w-[390px]">
            <div className="skeleton h-50"></div>
          </div>
          <div className="skeleton w-[240px] h-32"></div>
        </div>
      </div>
    </div>
  );
}
