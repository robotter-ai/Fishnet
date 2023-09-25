import { BsDot } from 'react-icons/bs';
import capitalize from 'lodash.capitalize';
import { Connection } from '@solana/web3.js';

export const VALUES_AND_INTERVAL = [
  'returnsBTC',
  'volaBTC',
  'volaETH',
  'txncostETH',
  'returnsBNB',
  'returnsADA',
  'cashvolADA',
  'returnsETC',
  'volaETC',
  'cashvolETH',
  'cashvolLTC',
  'cashvolLINK',
  'volaADA',
  'returnsLINK',
  'cashvolETC',
  'volaLTC',
  'volaLINK',
  'returnsLTC',
  'cashvolBTC',
  'returnsETH',
  'volaBNB',
  'cashvolBNB',
];

export type Data = {
  [Key in keyof typeof VALUES_AND_INTERVAL]?: string;
} & {
  date: string;
};

const COLORS = {
  green: '#1CC272',
  yellow: '#FABE23',
  red: '#ff1f23',
};

export const STATUS_COLOR: { [key: string]: string } = {
  Allowed: COLORS.green,
  Successful: COLORS.green,
  Waiting: COLORS.yellow,
  Requested: COLORS.yellow,
  Pending: COLORS.yellow,
  Refused: COLORS.red,
  Failed: COLORS.red,
};

const NEW_STATUS_COLOR: { [key: string]: string } = {
  allowed: COLORS.green,
  successful: COLORS.green,
  granted: COLORS.green,
  success: COLORS.green,
  waiting: COLORS.yellow,
  requested: COLORS.yellow,
  pending: COLORS.yellow,
  running: COLORS.yellow,
  refused: COLORS.red,
  failed: COLORS.red,
  denied: COLORS.red,
};

const StatusIndicator = ({ status }: { status: string }) => (
  <BsDot
    size={45}
    color={NEW_STATUS_COLOR[status ? status.toLowerCase() : '']}
  />
);

export const StatusIdentifier = ({ status }: { status: string }) => (
  <div className="flex items-center whitespace-nowrap text-center">
    <p>{capitalize(status)}</p>
    <StatusIndicator status={status} />
  </div>
);

export const FISHNET_MARKETPLACE_AUTH =
  'fisherH6SRzYVd2JE53Kgiax9R9MmtS95TC8ERPr3D7';
export const FISHNET_MARKETPLACE =
  '5WnQLqDpc35PodFDBH6ZAWzDonvt4SF9R9wHq7mhMBG';
export const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
export const SOLANA_CONNECTION = new Connection(import.meta.env.VITE_RPC);
