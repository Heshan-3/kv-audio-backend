import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "customer"
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    profilePicture : {
        type : String,
        required : true,
        default : "C:\Users\Heshan Kawithra\OneDrive\Desktop\Web Development Course\day 1\pic.webp"
    },
    emailVerified : {
        type : Boolean,
        required : true,
        default : false
    }
});

const User = mongoose.model("User",userSchema);

export default User;

//secureAdminPassword123
//adminnn@example.com