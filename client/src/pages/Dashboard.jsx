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
  Flame
} from "lucide-react";


function Dashboard({ darkMode }) {


  const [expenses,setExpenses] = useState([]);



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



  // TOTAL EXPENSE

  const totalExpense = expenses.reduce(
    (sum,expense)=>
      sum + Number(expense.amount),
    0
  );



  // HIGHEST EXPENSE

  const highestExpense = expenses.length
  ?
  Math.max(
    ...expenses.map(
      e=>Number(e.amount)
    )
  )
  :
  0;



  // AVERAGE EXPENSE

  const averageExpense = expenses.length
  ?
  Math.round(totalExpense / expenses.length)
  :
  0;




  // CATEGORY WISE DATA


  const categoryData = expenses.reduce(
    (acc,expense)=>{


      const category = expense.category;


      if(!acc[category]){

        acc[category]=0;

      }


      acc[category]+=Number(expense.amount);


      return acc;


    },
    {}
  );



  const pieData = Object.keys(categoryData)
  .map(category=>({

    name:category,

    value:categoryData[category]

  }));




  // BAR DATA


  const barData = expenses.map(expense=>({

    title:expense.category,

    amount:Number(expense.amount)

  }));



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





{/* SUMMARY CARDS */}



<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"20px",

marginBottom:"40px"

}}
>



<div className="dashboard-card">


<div className="card-header">

<Wallet size={22}/>

<h3>
Total Spent
</h3>

</div>


<h2>
₹{formatCurrency(totalExpense)}
</h2>


<p>
All time expenses
</p>


</div>





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





<div className="dashboard-card">


<div className="card-header">

<TrendingUp size={22}/>

<h3>
Average Expense
</h3>

</div>


<h2>

₹{formatCurrency(averageExpense)}

</h2>


<p>
Per transaction
</p>


</div>





<div className="dashboard-card">


<div className="card-header">

<Flame size={22}/>

<h3>
Highest Expense
</h3>

</div>


<h2>

₹{formatCurrency(highestExpense)}

</h2>


<p>
Biggest spending
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

(

<div className="empty-state">


<h3>
No transactions yet
</h3>


<p>
Start adding expenses to see activity here.
</p>


</div>

)


:

(

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

₹{expense.amount}

</strong>



</div>


))


)

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





{/* PIE CHART */}



<div

className="chart-box"

style={{

background:
darkMode ? "#1f2937":"white",

padding:"20px",

borderRadius:"15px",

boxShadow:
"0 2px 10px rgba(0,0,0,0.08)"

}}

>



<h2>
Expense Breakdown
</h2>



{

pieData.length===0

?

(

<div className="empty-chart">


<h3>
No expense data yet
</h3>


<p>
Add expenses to see analysis
</p>


</div>


)


:

(

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

fill={
COLORS[index % COLORS.length]
}

/>


))

}



</Pie>


<Tooltip/>


<Legend/>


</PieChart>



</ResponsiveContainer>

)

}



</div>







{/* BAR CHART */}



<div

className="chart-box"

style={{

background:
darkMode ? "#1f2937":"white",

padding:"20px",

borderRadius:"15px",

boxShadow:
"0 2px 10px rgba(0,0,0,0.08)"

}}

>


<h2>
Category Analytics
</h2>



{

barData.length===0

?


(

<div className="empty-chart">


<h3>
No analytics available
</h3>


<p>
Your insights will appear here
</p>


</div>

)


:

(


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


)


}



</div>





</div>






</div>


);


}


export default Dashboard;