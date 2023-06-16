import classNames from 'classnames';

interface SummaryProps {
  summary: {
    name: string;
    value: React.ReactNode | string | number;
  }[];
}

const DataSummary: React.FC<SummaryProps> = ({ summary }) => {
  return (
    <div className="bg-[#FAFAFA] rounded-[10px]">
      <h1 className="p-4 px-6">Summary</h1>
      {summary.map((item, i) => (
        <div
          key={i}
          className={classNames('flex justify-between gap-5 py-2 px-6', {
            'bg-[#E6EEFF]': (i + 1) % 2 !== 0,
          })}
        >
          <p>{item.name}:</p>
          {item.value}
        </div>
      ))}
    </div>
  );
};

export default DataSummary;
