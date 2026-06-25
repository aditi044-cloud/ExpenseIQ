import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  Wallet,
  Receipt,
  TrendingUp,
  Flame,
  Eye,
  EyeOff
} from "lucide-react";


function Dashboard({ darkMode }) {


const [expenses,setExpenses] = useState([]);

const [showMoney,setShowMoney] = useState(true);



useEffect(()=>{

fetchExpenses();

},[]);



const fetchExpenses = async()=>{

try{

const response = await API.get("/expenses");

setExpenses(response.data);


}
catch(error){

console.log(error);

}

};





const formatCurrency=(amount)=>{

return amount.toLocaleString("en-IN");

};



const showAmount=(amount)=>{

return showMoney
?
`₹${formatCurrency(amount)}`
:
"₹ •••••";

};





// TOTAL EXPENSE ONLY

const totalExpense = expenses.reduce(

(sum,expense)=>

expense.type==="Expense"
?
sum + Number(expense.amount)
:
sum,

0

);





// TOTAL INCOME

const totalIncome = expenses.reduce(

(sum,expense)=>

expense.type==="Income"
?
sum + Number(expense.amount)
:
sum,

0

);





// BALANCE

const balance = totalIncome - totalExpense;





// HIGHEST EXPENSE

const highestExpense = expenses.length

?

Math.max(

...expenses

.filter(e=>e.type==="Expense")

.map(e=>Number(e.amount))

)

:

0;





// AVERAGE EXPENSE

const expenseTransactions = expenses.filter(

e=>e.type==="Expense"

);



const averageExpense = expenseTransactions.length

?

Math.round(
totalExpense / expenseTransactions.length
)

:

0;






// CATEGORY DATA


const categoryData = expenses.reduce(

(acc,expense)=>{


if(expense.type==="Expense"){


const category = expense.category;


if(!acc[category]){

acc[category]=0;

}


acc[category]+=Number(expense.amount);


}


return acc;


},

{}



);





const pieData = Object.keys(categoryData)

.map(category=>(

{

name:category,

value:categoryData[category]

}

));







// BAR DATA


const barData = expenses

.filter(e=>e.type==="Expense")

.map(expense=>(

{

title:expense.category,

amount:Number(expense.amount)

}

));






const COLORS=[

"#4f46e5",
"#06b6d4",
"#10b981",
"#f59e0b",
"#ef4444"

];







return(


<div className={`app ${darkMode?"dark":""}`}>



<h1
style={{
marginBottom:"34px"
}}
>

Dashboard

</h1>






<div

style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"20px",

marginBottom:"40px"

}}

>





{/* TOTAL EXPENSE */}


<div className="dashboard-card">


<div className="card-header">


<Wallet size={22}/>


<h3>
Total Expense
</h3>


<button
className="eye-btn"
onClick={()=>setShowMoney(!showMoney)}
>
{
showMoney 
?
<Eye size={18}/>
:
<EyeOff size={18}/>
}
</button>


</div>



<h2>

{showAmount(totalExpense)}

</h2>



<p>

All time expenses

</p>


</div>






{/* TRANSACTIONS */}



<div className="dashboard-card">


<div className="card-header">


<Receipt size={22}/>


<h3>
Transactions
</h3>


</div>


<h2>

{expenses.length}

</h2>


<p>
Total records
</p>


</div>








{/* AVERAGE */}


<div className="dashboard-card">


<div className="card-header">


<TrendingUp size={22}/>


<h3>
Average Expense
</h3>


</div>



<h2>

{showAmount(averageExpense)}

</h2>


<p>
Per transaction
</p>


</div>







{/* INCOME */}


<div className="dashboard-card">


<div className="card-header">


<Flame size={22}/>


<h3>
Total Income
</h3>


</div>


<h2>

{showAmount(totalIncome)}

</h2>



<p>
Money received
</p>



</div>








{/* BALANCE */}


<div className="dashboard-card">


<div className="card-header">


<Wallet size={22}/>


<h3>
Balance
</h3>


</div>


<h2>

{showAmount(balance)}

</h2>


<p>
Income - Expense
</p>


</div>




</div>









{/* RECENT TRANSACTIONS */}



<div className="transactions-box">


<h2>

Recent Transactions

</h2>



{

expenses.length===0

?

<div className="empty-state">


<h3>
No transactions yet
</h3>


<p>
Start adding expenses
</p>


</div>


:


expenses.slice(0,5).map(expense=>(


<div

key={expense._id}

style={{

display:"flex",

justifyContent:"space-between",

padding:"12px 0",

borderBottom:"1px solid #eee"

}}

>


<span>

{expense.title}

</span>



<strong>

{showAmount(Number(expense.amount))}

</strong>


</div>


))


}





</div>









{/* CHARTS */}



<div

style={{

marginTop:"40px",

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(350px,1fr))",

gap:"20px"

}}

>








<div

className="chart-box"

style={{

background:
darkMode ? "#1f2937":"white",

padding:"20px",

borderRadius:"15px"

}}

>


<h2>
Expense Breakdown
</h2>



{

pieData.length===0

?


<div className="empty-chart">

<h3>
No expense data
</h3>


</div>


:


<ResponsiveContainer

width="100%"

height={300}

>


<PieChart>


<Pie

data={pieData}

dataKey="value"

nameKey="name"

outerRadius={100}

label

>


{

pieData.map((entry,index)=>(


<Cell

key={index}

fill={COLORS[index % COLORS.length]}

/>


))

}



</Pie>


<Tooltip/>


<Legend/>


</PieChart>



</ResponsiveContainer>


}





</div>









<div

className="chart-box"

style={{

background:
darkMode ? "#1f2937":"white",

padding:"20px",

borderRadius:"15px"

}}

>



<h2>
Category Analytics
</h2>





{

barData.length===0

?


<div className="empty-chart">

<h3>
No analytics
</h3>

</div>


:


<ResponsiveContainer

width="100%"

height={300}

>


<BarChart data={barData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="title"/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="amount"

fill="#4f46e5"

/>


</BarChart>



</ResponsiveContainer>


}





</div>





</div>







</div>


);


}



export default Dashboard;