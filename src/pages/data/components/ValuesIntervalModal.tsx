import { CheckBox } from '@components/form';
import AppModal from '@components/ui/AppModal';
import { VALUES_AND_INTERVAL } from '@shared/constant';
import Button from '@components/ui/Button';

interface IValuesIntervalModalProps {
  isOpen: boolean;
  selectedChart: any;
  handleClose: () => void;
  handleSaveChart: () => void;
  handleOnchangeChart: (input: 'interval' | 'keys', value: any) => void;
}

const ValuesIntervalModal: React.FC<IValuesIntervalModalProps> = ({
  isOpen,
  selectedChart,
  handleClose,
  handleSaveChart,
  handleOnchangeChart,
}) => {
  return (
    <AppModal
      title="Values and Interval"
      isOpen={isOpen}
      handleClose={handleClose}
      fullWidth
    >
      <div className="grid grid-cols-7 gap-3 shadow-lg p-4 rounded">
        {VALUES_AND_INTERVAL.map((item, i) => {
          return (
            <div key={i}>
              <CheckBox
                label={item}
                checked={
                  selectedChart.keys ? selectedChart.keys.includes(item) : false
                }
                onChange={() => handleOnchangeChart('keys', item)}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-5">
        <Button text="Save" size="lg" onClick={handleSaveChart} />
      </div>
    </AppModal>
  );
};

export default ValuesIntervalModal;
