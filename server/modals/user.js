import mongoose, { Schema, Types, model } from "mongoose";


const schema = new Schema({
    name:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            require:true,
        },
        url:{
            type:String,
            require:true,
        }
    }
},{
    timestamps:true,
})

export const User = mongoose.models.User || model("User", schema)