import mongoose, { Schema, Types, model } from "mongoose";


const schema = new Schema({
    content: String,
    attachments: [
        {
            public_id: {
                type: String,
                require: true,
            },
            url: {
                type: String,
                require: true,
            }
        }
    ],
    sender: {
        type: Types.ObjectId,
        ref: "User",
        requir: true,
    },
    chat: {
        type: Types.ObjectId,
        ref: "Chat",
        requir: true,
    },
}, {
    timestamps: true,
})

export const Messages = mongoose.models.Messages || model("Messages", schema)