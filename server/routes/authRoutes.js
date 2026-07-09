const auth = require("../middleware/auth"); 
const express = require("express");
const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// REGISTER

router.post("/register", async(req,res)=>{

try{


const {
name,
email,
password
}=req.body;



const existing =
await User.findOne({email});


if(existing){

return res.status(400).json({

message:"User already exists"

});

}



const hashedPassword =
await bcrypt.hash(password,10);



const user = new User({

name,

email,

password:hashedPassword

});



await user.save();


const token = jwt.sign(
{
 id:user._id
},
process.env.JWT_SECRET,
{
 expiresIn:"1d"
}
);


res.json({

message:"Registered successfully",

token,

user:{
 id:user._id,
 name:user.name,
 email:user.email
}

});


}


catch(error){

res.status(500).json({

error:error.message

})

}


});





// LOGIN


router.post("/login", async(req,res)=>{


try{


const {
email,
password
}=req.body;



const user =
await User.findOne({email});


if(!user){

return res.status(404).json({

message:"User not found"

});

}



const check =
await bcrypt.compare(

password,

user.password

);



if(!check){

return res.status(400).json({

message:"Wrong password"

});

}




const token =
jwt.sign(

{
id:user._id
},

process.env.JWT_SECRET,

{
expiresIn:"1d"
}

);



res.json({

token,


user:{

id:user._id,

name:user.name,

email:user.email

}

});


}



catch(error){

res.status(500).json({

error:error.message

})

}


});

// GET CURRENT USER
router.get("/me", auth, async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});
// UPDATE PROFILE
router.put("/update-profile", auth, async (req, res) => {

  try {

    const { name, email, currency, monthlyIncome, savingGoal } = req.body;

    const updatedUser = await User.findByIdAndUpdate(

      req.user.id,

      {
        name,
        email,
        currency,
        monthlyIncome,
        savingGoal
      },

      {
        new: true
      }

    ).select("-password");

    res.json(updatedUser);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;