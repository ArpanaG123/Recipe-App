const userModel  = require('../models/userModel')
const bcrypt = require('bcrypt')

//registered users
exports.registerController = async (req,res) => {
    try {
        //all fields are filled or not
        const{username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).send({
                message:"Fill all the fields",
                success:false
            })
        }
        //existing user check
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(500).send({
                message:"User already registered",
                success:false
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        //save new user
        const user = new userModel({username,email,password:hashedPassword})
        await user.save();
        return res.status(200).send({
            message:"New User created successfully",
            success:true,
            user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:"Error in registered",
            success:false,
            error
        }) 
    }
};

//get users
exports.getAllUsers = async (req,res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount:users.length,
            success:true,
            message:"All users data",
            users,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:"Error in users",
            success:false,
            error
        }) 
        
    }
};


//login users 
exports.loginController = async(req,res) => {
    try {
        const{email,password} = req.body;
        if(!email || !password){
            return res.status(401).send({
                message:"Please provide email or password",
                success:false
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                message:"Email is not registered",
                success:false
            })
        }

        //password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).send({
                message:"Invalid username or password",
                success:false
            })
        }
        return res.status(200).send({
            message:"login successfully",
            success:true,
            user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:"Error in login",
            success:false,
            error
        })  
    }
};


