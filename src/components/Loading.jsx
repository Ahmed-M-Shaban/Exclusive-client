import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[50vh]">
      <InfinitySpin
        visible={true}
        width="200"
        color="#DB4444"
        ariaLabel="infinity-spin-loading"
      />
      <h1 className="text-4xl font-semibold">Exclusive</h1>
    </div>
  );
};

export default Loading;
