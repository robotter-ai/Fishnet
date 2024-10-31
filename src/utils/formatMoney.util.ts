import { ICryptoStats } from '@pages/overview-bots/hooks/useProfile';

export const formatMoney = (amount: number): string => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const totalAmount = (cryptoStats: ICryptoStats[]) =>
  formatMoney(
    cryptoStats.reduce((accum, currentVal) => accum + currentVal.amount, 0)
  );
