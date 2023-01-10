import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async(req,res)=>{

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
    const newUser = new UserModel(req.body);
    const {email}= req.body;
    
    try {
        const oldUser = await UserModel.findOne({email});
        if(oldUser){
            return res.status(400).json({message:"Email is alredy in use!"})
        }
        const user = await newUser.save();
        const token = jwt.sign({
            email:user.email, id: user._id
        },process.env.JWT_KEY,{expiresIn:'1h'});
        res.status(200).json({user, token});
    } catch (error) {
        res.status(500).json({message: error})
    }
}


