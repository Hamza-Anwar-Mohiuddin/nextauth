import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:[true, "Please Provide Username"],
        unique:true
    },

    email: {
        type:String,
        required:[true, "Please Provide an Email"],
        unique:true
    },

    password: {
        type:String,
        required:[true, "Please Provide Password"]
    },

    isVerified: {
        type:Boolean,
        default:false
    },
    isAdmin: {
        type:Boolean,
        default:false
    },

    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    verifyToken: String,
    verifyExpiry:Date
})

// normally ham ye karte hain
// Normal backend ke sath ham const User = mongoose.model('User', userSchema) ese karte the qk mongoDB khud se db me usko users kardeta tha yani all lower case or plural yahan ham esa nahi karenge
const User = mongoose.models.users || mongoose.model('users', userSchema)
// he reason why mongoose.models is used instead of mongoose.model is because mongoose.models holds a reference to all the models that have been registered with Mongoose, whereas mongoose.model is a function used to define a new mode
// nextjs aik edge time framwork hai to wo ye detect nahi karpata k hamara model first time banra hai ya ban chuka to us case ko handle karna hoga ke agar bana hua hai to reference dedo nahi bana wa to banado
export default User