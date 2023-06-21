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


const absancesGRH = mongoose.Schema(
    {
        cin:{type:String, unique:true},
        date_d:String,
        date_f:String,
        nmbre_jr:String,
        justify:String,
        details:String,
    },
    {
        collection:"absancesGRH",
    }
);
mongoose.model("absancesGRH",absancesGRH)

