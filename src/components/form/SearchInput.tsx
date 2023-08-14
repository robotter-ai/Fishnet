import { SearchIcon } from '@assets/icons';

interface ISearchInputProps {
  value: string;
  onChange: (value: any) => void;
}

const SearchInput: React.FC<ISearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <input
        className="outline-none border border-solid border-[#e5e5e5] h-[44px] w-72 px-5 py-3 rounded-full"
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex items-center h-full w-fit absolute top-0 right-0 px-2 pr-5">
        <SearchIcon color="#172025" />
      </div>
    </div>
  );
};

export default SearchInput;
