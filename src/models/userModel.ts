
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
        required: false,
        default: "https://greekherald.com.au/wp-content/uploads/2020/07/default-avatar.png",
    },
    wachtwoord: {
        type: String,
        required: true,
        hash: true,
    },
    favorieten: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Voertuig",
        required: false,
        default: [],
    },
},
{
    timestamps: true
}
);

export const User = mongoose.model("User", userSchema);

