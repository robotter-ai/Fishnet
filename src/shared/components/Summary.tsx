import classNames from 'classnames';

interface SummaryProps {
  summary: {
    name: string;
    value: React.ReactNode | string | number;
  }[];
}

const DataSummary: React.FC<SummaryProps> = ({ summary }) => {
  return (
    <div className="bg-form-bg rounded-[32px] py-5">
      <h1 className="py-2 px-6">Summary</h1>
      {summary.map((item, i) => (
        <div
          key={i}
          className={classNames(
            'flex justify-between font-normal text-sm gap-5 py-2 px-6',
            {
              'bg-[#EDF2FA]': (i + 1) % 2 !== 0,
            }
          )}
        >
          <p>{item.name}:</p>
          {item.value}
        </div>
      ))}
    </div>
  );
};

export default DataSummary;
