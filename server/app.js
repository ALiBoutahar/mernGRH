const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors =require("cors");
app.use(cors());

// *****************************************************************Connection mongoDB
// const mongoUrl=
// "mongodb://localhost:27017"
// mongoose
//   .connect(mongoUrl,{
//     useNewUrlParser:true,
//   })
//   .then(()=>{
//     console.log("connected ali to database");
//   })
//   .catch((e)=>console.log('not warking'));
mongoose.connect('mongodb://127.0.0.1:27017/grh');
require("./userDetails");
// **************************************************************Select les collection

const User = mongoose.model("userGRH");
const Personne = mongoose.model("personnesGRH");
// const absance = mongoose.model("absancesGRH");

// ********************************************************************* list personne
app.post("/persone",async(req, res)=>{
  try{
    Personne.find()
      .then((data)=>{
        res.send({status : "ok", data:data})
      })
      .catch((error)=>{
        res.send({status : "error", data: error});
      });
  }catch (error) {res.send({ status:"error"})}
});
// ********************************************************************** Add personne
app.post("/Add_persone",async( req, res )=>{
  const  {cin, nom, prenom, email, tele, naissance, image, service, competance, type, valide} = req.body ;
  try{
    await Personne.create({cin, nom, prenom, email, tele, naissance, image, service, competance, type, valide});  
    res.send({ status:"Data inserted"});
    console.log({ cin, nom, prenom, email, tele, naissance, image, service, competance, type, valide } );
  }catch(eror){
    res.send({ status:"error"})
  }
});
// ******************************************************************* Delete personne
app.post("/sup_personne",async( req, res )=>{
  const {id} = req.body ;
  try{
    Personne.deleteOne({ _id: id })
      .then((data)=>{
        res.send({status : "ok", data:data})
      })
      .catch((error)=>{
        res.send({status : "error", data: error});
      });
  }catch (error) {res.send({ status:"error"})}
});
// ********************************************************************** Edit personne
app.post("/edit_personne",async( req, res )=>{
  const {cin, nom, prenom, email, tele, naissance, image, service, type, valide, id} = req.body ;
  try{
    Personne.updateOne(
      { _id: id },{$set:{"cin":cin, "nom":nom, "prenom":prenom, "email":email, "tele":tele, "naissance":naissance, "image":image, "service":service, "type":type, "valide":valide}}
      )
      .then((data)=>{
        res.send({status : "ok", data:data})
        console.log("data update")
      })
      .catch((error)=>{
        res.send({status : "error", data: error});
      });
  }catch(eror){res.send({ status:"error"})}
});
// ********************************************************************* data personne
app.post("/persone_data",async( req, res )=>{
  const {id} = req.body ;
  try{
    Personne.findOne({_id:id})
      .then((data)=>{
        res.send({status : "ok", data:data})
      })
      .catch((error)=>{
        res.send({status : "error", data: error});
      });
  }catch (error) {res.send({ status:"error"})}
}); 
// ************************************************************************ Add user
app.post("/Register",async( req, res )=>{
  const {user, tele, email, pass} = req.body ;
  try{
    const olduser = await User.findOne({email});
    if(olduser){
      return res.send({error:"User Exsist"});
    }
    await User.create({user,tele,email,pass,valide:0,}); 
    res.send({ status:"Data inserted"});
    console.log({user, tele, email, pass } );
  }catch(eror){
    res.send({ status:"error"})
  }
});
// ********************************************************************** Edit user
app.post("/edit_user",async( req, res )=>{
  const {user,tele,email,pass} = req.body ;
  try{
    User.updateOne(
      { email:email },{$set:{'user':user,'tele':tele,'email':email,'pass':pass}}
      )
      .then((data)=>{
        res.send({status : "ok", data:data})
        console.log("data update")
      })
      .catch((error)=>{
        res.send({status : "error", data: error});
      });
  }catch(eror){
    res.send({ status:"error"})
  }
});
// ******************************************************************** login user
app.post("/login",async( req, res )=>{
  const { email, pass } = req.body ;
  const use = await User.findOne({email});
  if (!use){
    return res.send({error:"User Not Exsist"});
  }
  if (pass === use.pass){
    const token = {email: use.email};
    if(res.status(201)){
      return res.send({status:"ok",data:token})
    }else{
      return res.send({error:"error"});
    }
  }
  res.json({status : "error",error:"Invalide password"})
});
// ********************************************************************* data user
app.post("/userData",async( req, res )=>{
  const {token} = req.body ;
  try{
    const user =(token);
    User.findOne({email:user})
      .then((data)=>{
        res.send({status : "ok", data:data})
      })
      .catch((error)=>{
        res.send({status : "error", data: error});
      });
  }catch (error) {}
});


// ***********************************************************  Port listen 5000
app.listen(5000, () => {
  console.log("server ali started");
});