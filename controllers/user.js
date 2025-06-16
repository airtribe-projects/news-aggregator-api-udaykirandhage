const express = require('express')
const router = express.Router();
const userModel = require('../Database/database')
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken")
const JWT_Secret = "Hello Taken"

router.use(express.json());

//Registering user
const register = (async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use cannot register" });
        }
        const Hashpassword = bcrypt.hashSync(password,10);

        const newUser = await userModel.create({ name, email, password:Hashpassword, role });
        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
});


//Login - User------------

const login = (async (req,res)=>{
    try {

         const {email,password}=req.body;
         console.log(req.body)

        const Dbuser = await userModel.findOne({email:email})
        if(!Dbuser){
            return res.status(401).send({text:"Invalid Email"})
        }
        const isPasswordvalid = bcrypt.compareSync(password,Dbuser.password);

        if(!isPasswordvalid){
           res.status(401).send("Invalid password")
        }

        const resUser = {
            name:Dbuser.name,
            email:Dbuser.email,
            role:Dbuser.role
        }

        const token = jwt.sign(resUser,JWT_Secret,{expiresIn: '2h'})
         console.log(token)
        return res.send(token)
       
          
       }
   catch(err){
    console.log(err);
   }
})

module.exports = {login,register}