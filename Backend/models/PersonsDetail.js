const mongoose = require('mongoose');

const personDetailSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    payment:{
        type: String,
    },
    address:{
        type: String,
    },
    orderdetails:{
        type: Array,
    }
});
module.exports = mongoose.model('PersonDetail', personDetailSchema);