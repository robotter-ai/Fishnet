import { BsDot } from 'react-icons/bs';

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

const COLORS = {
  green: '#1CC272',
  yellow: '#FABE23',
  red: '#FD686A',
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
  success: COLORS.green,
  waiting: COLORS.yellow,
  requested: COLORS.yellow,
  pending: COLORS.yellow,
  running: COLORS.yellow,
  refused: COLORS.red,
  failed: COLORS.red,
};

export const StatusIdentifier = ({ status }: { status: string }) => (
  <div className="flex items-center whitespace-nowrap text-center">
    <p>{status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}</p>
    <BsDot size={45} color={NEW_STATUS_COLOR[status.toLowerCase()]} />
  </div>
);
