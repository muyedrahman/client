import { ScaleLoader } from 'react-spinners'

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`bg-red-50 ${
        smallHeight ? "h-[250px]" : "h-[70vh]"
      } flex flex-col justify-center items-center`}
    >
      <ScaleLoader size={100} color="red" />
    </div>
  );
}

export default LoadingSpinner
