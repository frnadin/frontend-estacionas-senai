import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';



export default function PieChartVagas({ data }) {
  const COLORS = ['#5CC133', '#254AA5'];

  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={50}
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
