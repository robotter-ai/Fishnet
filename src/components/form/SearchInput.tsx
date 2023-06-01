import { VscSearch } from 'react-icons/vsc';

interface ISearchInputProps {
  value: string;
  onChange: (value: any) => void;
}

const SearchInput: React.FC<ISearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <input
        className="bg-light-20 outline-light-20 h-[44px] w-72 p-[16px] py-[10px] rounded-[10px]"
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="bg-light-20 flex items-center h-full w-fit absolute top-0 right-0 px-2 pr-4 rounded-[10px]">
        <VscSearch color="#172025" />
      </div>
    </div>
  );
};

export default SearchInput;
