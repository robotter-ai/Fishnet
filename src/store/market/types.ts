export interface CandleProps {
  connector_name: string;
  trading_pair: string;
  market_address: string;
  interval: string;
  start_time: number;
  end_time: number;
}

interface CandleData {
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  unixTime: number;
  address: string;
  type: string;
}

export interface CandleDataResp {
  data: Array<CandleData>;
}
