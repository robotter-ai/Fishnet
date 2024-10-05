import { FaSort } from 'react-icons/fa';
import { Fragment } from 'react';

interface TradeRow {
  Buy: {
    date: string;
    coins: string;
    signal: string;
    price: number;
    amount: string;
    fees: string;
  };
  Sell: {
    date: string;
    coins: string;
    signal: string;
    price: number;
    amount: string;
    fees: string;
  };
  Profit: string;
  PnL: string;
}

const tableData: TradeRow[] = [
  {
    Buy: {
      date: '2023-11-30, 21:45',
      coins: 'SOL / BNB',
      signal: 'BarDown',
      price: 3.8,
      amount: '5 SOL',
      fees: '0.001 SOL',
    },
    Sell: {
      date: '2023-11-30, 22:00',
      coins: 'SOL / BNB',
      signal: 'BarUp',
      price: 4.2,
      amount: '5 SOL',
      fees: '0.001 SOL',
    },
    Profit: '$100',
    PnL: '20%',
  },
  {
    Buy: {
      date: '2023-11-30, 21:45',
      coins: 'SOL / BNB',
      signal: 'BarDown',
      price: 3.8,
      amount: '5 SOL',
      fees: '0.001 SOL',
    },
    Sell: {
      date: '2023-11-30, 22:00',
      coins: 'SOL / BNB',
      signal: 'BarUp',
      price: 4.2,
      amount: '5 SOL',
      fees: '0.001 SOL',
    },
    Profit: '-$20',
    PnL: '-20%',
  },
  {
    Buy: {
      date: '2023-11-30, 21:45',
      coins: 'SOL / BNB',
      signal: 'BarDown',
      price: 3.8,
      amount: '5 SOL',
      fees: '0.001 SOL',
    },
    Sell: {
      date: '2023-11-30, 22:00',
      coins: 'SOL / BNB',
      signal: 'BarUp',
      price: 4.2,
      amount: '5 SOL',
      fees: '0.001 SOL',
    },
    Profit: '$100',
    PnL: '20%',
  },
  {
    Buy: {
      date: '2023-11-30, 21:45',
      coins: 'SOL / BNB',
      signal: 'BarDown',
      price: 3.8,
      amount: '5 SOL',
      fees: '0.001 SOL',
    },
    Sell: {
      date: '2023-11-30, 22:00',
      coins: 'SOL / BNB',
      signal: 'BarUp',
      price: 4.2,
      amount: '5 SOL',
      fees: '0.001 SOL',
    },
    Profit: '-$20',
    PnL: '-20%',
  },
];

const headerData = [
  'Type',
  'Date',
  'Coins',
  'Signal',
  'Price',
  'Amount',
  'Fees',
  'Profit',
  'P&L, %',
];

const TradeTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            {headerData.map((title, index) => (
              <th
                key={index}
                className="text-xs text-dark-100 font-semibold px-4 py-4 border-b border-dark-100 uppercase whitespace-nowrap"
              >
                <span className="flex items-center gap-x-2">
                  {title}
                  <FaSort className="cursor-pointer" />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map(({ Buy, Sell, Profit, PnL }, index) => (
            <Fragment key={index}>
              {/* First row for Buy */}
              <tr className="text-left text-xs font-normal text-dark-300 border-b border-light-400">
                <td className="px-4 py-4 text-green-100">Buy</td>
                <td className="px-4 py-4">{Buy.date}</td>
                <td className="px-4 py-4">{Buy.coins}</td>
                <td className="px-4 py-4">{Buy.signal}</td>
                <td className="px-4 py-4">{Buy.price}</td>
                <td className="px-4 py-4">{Buy.amount}</td>
                <td className="px-4 py-4">{Buy.fees}</td>
                {/* Merged Profit and PnL cells */}
                <td
                  rowSpan={2}
                  className={`font-medium text-base px-4 py-4 ${
                    Profit.startsWith('-') ? 'text-red-100' : 'text-green-100'
                  }`}
                >
                  {Profit}
                </td>
                <td
                  rowSpan={2}
                  className={`font-medium text-base px-4 py-4 ${
                    PnL.startsWith('-') ? 'text-red-100' : 'text-green-100'
                  }`}
                >
                  {PnL}
                </td>
              </tr>
              {/* Second row for Sell */}
              <tr className="text-left text-xs font-normal text-dark-300 border-b border-dark-100">
                <td className="px-4 py-4 text-red-100">Sell</td>
                <td className="px-4 py-4">{Sell.date}</td>
                <td className="px-4 py-4">{Sell.coins}</td>
                <td className="px-4 py-4">{Sell.signal}</td>
                <td className="px-4 py-4">{Sell.price}</td>
                <td className="px-4 py-4">{Sell.amount}</td>
                <td className="px-4 py-4">{Sell.fees}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeTable;
