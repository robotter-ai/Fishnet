import { BackIcon } from '@assets/icons';

function GoBack() {
  return (
    <div
      id="go_back_arrow"
      className="flex gap-x-2 ml-2 items-center cursor-pointer text-navy transition-all hover:translate-x-[-2px] hover:text-blue-300"
    >
      <BackIcon />
      <span className="font-semibold text-xs">Back</span>
    </div>
  );
}

export default GoBack;
