import { FadeLoader } from 'react-spinners';

const ViewLoader = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading) {
    return (
      <div className="absolute flex justify-center items-center inset-0 bg-white bg-opacity-50 backdrop-blur-sm rounded-md z-[99]">
        <FadeLoader color="#0054ff" height={10} margin={-5} width={3} />
      </div>
    );
  }

  return null;
};

export default ViewLoader;
