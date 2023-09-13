import classNames from 'classnames';

interface SummaryProps {
  title?: string;
  summary: {
    name: string;
    value: React.ReactNode | string | number;
  }[];
}

const DataSummary: React.FC<SummaryProps> = ({
  title = 'Summary',
  summary,
}) => {
  return (
    <div className="bg-form-bg rounded-[32px] pb-5 overflow-hidden">
      <h2 className="py-2 pt-5 px-6">{title}</h2>
      {summary.map((item, i) => (
        <div
          key={i}
          className={classNames(
            'flex justify-between font-normal text-sm gap-5 py-2 px-6',
            {
              'bg-[#EDF2FA]': (i + 1) % 2 !== 0,
              'flex-col !justify-start !gap-2 rounded-3xl h-full':
                item.name === 'Description',
            }
          )}
        >
          <p>{item.name}:</p>
          <span className="text-[#566164]">{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default DataSummary;
