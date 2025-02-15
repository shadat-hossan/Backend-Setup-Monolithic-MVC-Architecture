const mongoose = require('mongoose');
const { Schema } = mongoose;
const { roles } = require("../config/roles");

const notificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sendBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    transactionId: {
        type: String,
        required: false,
        default: null
    },
    role: {
        type: String,
        required: false,
        enum: roles,
        default: null,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: false
    },
    devStatus: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread'
    },
    type: {
        type: String,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Notification", notificationSchema);
