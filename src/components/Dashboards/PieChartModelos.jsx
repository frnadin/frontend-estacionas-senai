import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function PieChartModelos({ data }) {
const COLORS = [
  '#007BFF', 
  '#32CD32',
  '#20B2AA',
];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
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
