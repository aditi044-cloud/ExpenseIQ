import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Profile.css";

import {
 FaUserCircle,
 FaEnvelope,
 FaWallet,
 FaMoneyBillWave,
 FaPiggyBank
} from "react-icons/fa";


function Profile({darkMode}){
    const [profile, setProfile] = useState({

    income:0,
    expense:0,
    savings:0,
    transactions:0

});
const [user, setUser] = useState({
  name: "",
  email: "",
  currency: "INR",
  monthlyIncome: 0,
  savingGoal: 0
});


useEffect(()=>{

    const fetchProfile = async()=>{

        try{

            const res = await API.get("/profile");

            setProfile(res.data);
            const userRes = await API.get("/auth/me");

setUser(userRes.data);

        }
        catch(error){

            console.log(error);

        }

    };


    fetchProfile();


},[]);


return(

<div className={`profile-page ${darkMode ? "dark":""}`}>



<h1 className="page-title">
Profile
</h1>



{/* TOP PROFILE CARD */}

<div className="profile-header">


<FaUserCircle className="profile-avatar"/>


<div className="profile-info">

<h2>{user.name}</h2>

<p>
<FaEnvelope/>
{user.email}
</p>


<button>
Edit Profile
</button>


</div>



</div>





<div className="profile-grid">



{/* PERSONAL */}

<div className="profile-card">


<h3>
Personal Details
</h3>


<div className="row">
  <span>Name</span>
  <p>{user.name}</p>
</div>

<div className="row">
  <span>Email</span>
  <p>{user.email}</p>
</div>
<div className="row">
  <span>Currency</span>
  <p>{user.currency}</p>
</div>


<div className="row">
<span>Member Since</span>
<p>2026</p>
</div>



</div>






{/* FINANCE */}

<div className="profile-card">


<h3>
Financial Overview
</h3>


<div className="finance-box">

<FaMoneyBillWave/>

<div>
<span>Income</span>
<h2>₹{profile.income.toLocaleString("en-IN")}</h2>
</div>

</div>



<div className="finance-box">

<FaPiggyBank/>

<div>
<span>Savings Goal</span>
<h2>₹{profile.savings.toLocaleString("en-IN")}</h2>
</div>

</div>



<div className="finance-box">

<FaWallet/>

<div>
<span>Total Expense</span>
<h2>₹{profile.expense.toLocaleString("en-IN")}</h2>
</div>

</div>



</div>




</div>





<div className="stats-card">


<h3>
Expense Statistics
</h3>


<div className="stats">


<div>

<h2>
₹{profile.expense.toLocaleString("en-IN")}
</h2>

<p>
Total Expense
</p>

</div>



<div>

<h2>
45
</h2>

<p>
Transactions
</p>

</div>


</div>


</div>



</div>


);
}


export default Profile;