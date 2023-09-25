import { MdStar, MdStarOutline } from 'react-icons/md';

const Starred = ({ starred }: { starred: boolean }) => {
  return (
    <div role="button">
      {starred ? (
        <MdStar size={25} color="#29324A" />
      ) : (
        <MdStarOutline size={25} color="#29324A" />
      )}
    </div>
  );
};

export default Starred;
