const mongoose = require("mongoose");

const userDetailsSchema = mongoose.Schema(
    {
        user:String,
        tele:String,
        email:{type:String, unique:true},
        pass:String,
        valide:Number,
    },
    {
        collection:"userGRH",
    }
);
mongoose.model("userGRH",userDetailsSchema);
