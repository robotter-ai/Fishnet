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
            'flex justify-between text-[#244141] items-center font-normal text-sm gap-5 py-2 px-6',
            {
              'bg-[#EDF2FA]': (i + 1) % 2 !== 0,
              'flex-col !justify-start !items-start !gap-2 rounded-3xl h-full':
                item.name === 'Description',
            }
          )}
        >
          <p>{item.name}:</p>
          {item.name === 'Description' ? !item.value ? (<span className="text-dark-20">No description</span>) :
              <span className="text-dark-40">{item.value}</span> :
            <span>{item.value}</span>}
        </div>
      ))}
    </div>
  );
};

export default DataSummary;