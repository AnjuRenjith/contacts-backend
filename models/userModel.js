const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        username : {
            type : String,
            required : [true, "Please add user name"],
        },
        email : {
            type:String,
            required: [true, "Please add user email address"],
            unique: [true, "Email address already registered"],
        },
        password : {
            type :  String,
            required : [true, "Please enter password"],

        }

    },{
        timestamps:true,
    },
    { strict: true }
);

module.exports = mongoose.model("User", userSchema);
