import { ResponsiveContainer, LineChart, Line } from 'recharts';

const MiniLineChart = ({ data, color }: { data: number[]; color: string }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.map((val, index) => ({ index, value: val }))}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MiniLineChart;
