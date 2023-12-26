const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required :[true, "Please add contact name"],
    },
    email: {
        type: String,
        required :[true, "Please add contact email id"],
    },
    phone: {
        type: String,
        required :[true, "Please add contact phone number"],
    },

},
{timestamps:true},
{ strict: true });

module.exports = mongoose.model("Contact" , contactSchema);