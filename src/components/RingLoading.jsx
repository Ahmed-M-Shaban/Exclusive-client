import { ThreeDots } from "react-loader-spinner";

const RingLoading = () => {
  return (
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#DB4444"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default RingLoading;
