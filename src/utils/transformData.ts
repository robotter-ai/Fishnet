interface InputData {
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  unixTime: number;
  address: string;
  type: string;
}

interface TransformedData {
  x: Date;
  y: number[];
}

export const transformData = (data: InputData[]): TransformedData[] => {
  return data.map((item) => ({
    x: new Date(item.unixTime * 1000),
    y: [item.o, item.h, item.l, item.c],
  }));
};
