const mongoose = require("mongoose");

const PersonnesGRH = mongoose.Schema(
    {
        cin:{type:String, unique:true},
        nom:String,
        prenom:String,
        email:{type:String, unique:true},
        tele:String,
        naissance:String,
        image:String,
        service:String,
        type:String,
        competance:[],
        valide:String, 
         
    },
    {
        collection:"personnesGRH",
    }
);
mongoose.model("personnesGRH",PersonnesGRH);
