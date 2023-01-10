import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const loginUser = async(req,res)=>{
    const {email,password}=req.body;

    try {
        const user = await UserModel.findOne({email: email})

        if(user){
            const validity = await bcrypt.compare(password,user.password)
            if(!validity){
                res.status(400).json("Wrong password");
            }else{
                const token = jwt.sign({
                    email:user.email, id: user._id
                },process.env.JWT_KEY,{expiresIn:'1h'})
                res.status(200).json({user, token})
            }

        }else{
            res.status(404).json("User does not exist")
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}