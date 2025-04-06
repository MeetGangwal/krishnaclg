import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default:'pending'
    },
    auditionVideo: {//added
        type: String, // Store Cloudinary URL
        default: null
    },
    urlvideo: {//added for video url
        type: String, 
        default: null 
    },
},{timestamps:true});
export const Application  = mongoose.model("Application", applicationSchema);