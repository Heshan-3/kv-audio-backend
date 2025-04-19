import mongoose from "mongoose";

const reviewShema = new mongoose.Schema({
    email : {
        type : String,
        required : true  
    },

    name : {
        type : String,
        required : true
    },

    rating : {
        type : Number,
        required : true
    },

    comment : {
        type : String,
        required : true
    },

    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    isApproved : {
        type : Boolean,
        required : true,
        default : false
    },
    profilePicture : {
        type : String,
        required : true,
        default : "C:\Users\Heshan Kawithra\OneDrive\Desktop\Web Development Course\day 1\pic.webp"
    }
})

const Review = mongoose.model("Review", reviewShema);

export default Review;