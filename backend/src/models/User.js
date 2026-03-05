import mongoose from "mongoose";


const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    displayName: {
        type: String,
        require: true,
        trim: true,
    },
    avatarUrl: {
        type: String, //Link CDN to display picture 
    },
    avatarId: {
        type: String, //Cloudinary public ID to delete picture
    },
    bio: {
        type: String,
        minlength: 500,
    },
    phone: {
        type: String,
        sparse: true // accpet null, do not trung 
    }
}, {
    timestamps: true,
     
}) 
const User = mongoose.model("User", userSchema)
export default User
