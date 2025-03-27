import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please provide your name"],
        minLength : [3,"Name must contain at least 3 characters"],
        maxLength : [30,"Name cannot exceed 30 characters"],
    },
    email:{
        type:String,
        required:[true,"please provide your email"],
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone:{
        type:Number,
        required:[true,"Please provide your number."]
    },
    password:{
        type : String,
        required:[true,"Please provide your password"],
        minLength:[8,"password must contain at least 8 characters"],
        maxLength:[32,"password cannot exceed 32 characters"],
        select: false
    },
    role:{
        type:String,
        required:[true,"please provide your role"],
        enum:["Job Seeker","Employer"],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

//hashing the password

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){  //if pasword has not chnaged then move to next middleware.. 
        next();
    }
    this.password= await bcrypt.hash(this.password,10); //this refers to the user which is being created
});

//comparing password )
userSchema.methods.comparePassword = async function(enteredPassword){ //adds a custom method to the userSchema called comparePassword
    return await bcrypt.compare(enteredPassword,this.password);
};

//jwt token generating
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })
};

export const User = mongoose.model("user",userSchema);
