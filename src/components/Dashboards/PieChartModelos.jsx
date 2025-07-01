import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function PieChartModelos({ data }) {
  const COLORS = [
    '#8CD65D',
    '#5B7EDC',
    '#808080'  
  ];

  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={70}
        label
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
