import { BackIcon } from '@assets/icons';

function GoBack() {
  return (
    <div
      id="go_back_arrow"
      className="flex gap-x-2 ml-2 items-center cursor-pointer text-navy transition-all hover:translate-x-[-2px]"
    >
      <BackIcon />
      <h2 className="font-semibold text-xs text-navy">Back</h2>
    </div>
  );
}

export default GoBack;
