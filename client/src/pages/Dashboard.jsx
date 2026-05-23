function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>

      <div className="dashboard">
        <div className="card">💰 Total</div>
        <div className="card">📉 Expenses</div>
        <div className="card">📈 Income</div>
      </div>

      <div className="analytics">
        <div className="insights">
          <h3>Insights</h3>
          <p>Top category: Food</p>
        </div>

        <div className="charts">
          <div className="chart">Bar Chart</div>
          <div className="chart">Pie Chart</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";
// export default function Dashboard({ filteredExpenses }) {
//   // 🔹 CATEGORY DATA (Pie)
// const categoryData = {};
//   filteredExpenses.forEach((e) => {
//     categoryData[e.category] = (categoryData[e.category] || 0) + e.amount;
//   });
//   if (!filteredExpenses.length) {
//   return <h2>No data yet. Add expenses first.</h2>;
// }
//   const pieData = Object.keys(categoryData).map((key) => ({
//     name: key,
//     value: categoryData[key],
//   }));
//   console.log(pieData);
//   // 🔹 MONTHLY TREND (Bar Chart)
//   const monthlyData = {};

//   filteredExpenses.forEach((e) => {
//     const month = new Date(e.date).toLocaleString("default", {
//       month: "short",
//     });

//     monthlyData[month] = (monthlyData[month] || 0) + e.amount;
//   });

//   const barData = Object.keys(monthlyData).map((m) => ({
//     month: m,
//     amount: monthlyData[m],
//   }));
//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
// const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
// const categoryTotals = {};
// filteredExpenses.forEach((e) => {
//   const category = e.category.trim().toLowerCase();
//   categoryTotals[category] = (categoryTotals[category] || 0) + e.amount;
// });

// let maxCategory = "";
// let maxAmount = 0; 
// Object.keys(categoryTotals).forEach((cat) => {
//   if (categoryTotals[cat] > maxAmount) {
//     maxAmount = categoryTotals[cat];
//     maxCategory = cat;
//   }
// });   
//   return ( <div>
//   <h1>Dashboard </h1>
//    <h2>Total Spending: ₹{total}</h2>
//       <h3>Top Category: {maxCategory}</h3>
//    {/* 🔥 PIE CHART */}
//      <PieChart width={400} height={300}>
//   <Pie
//     data={pieData}
//     dataKey="value"
//     nameKey="name"
//     cx="50%"
//     cy="50%"
//     outerRadius={100}
//     label
//   >
//     {pieData.map((entry, index) => (
//       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//     ))}
//   </Pie>
//   <Tooltip />
//   <Legend />
// </PieChart>

//       {/* 🔥 BAR CHART */}
//       <BarChart width={400} height={300} data={barData}>
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Bar dataKey="amount" />
//       </BarChart>

//     </div>
//   );

// }