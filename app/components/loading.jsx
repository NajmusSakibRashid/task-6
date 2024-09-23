import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black opacity-25 z-20 flex justify-center items-center">
      <ClipLoader color="white" size={150} />
    </div>
  );
};

export default Loading;
