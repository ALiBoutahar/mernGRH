const express = require("express");
const mongoose = require("mongoose");
require("../model/users");

// **************************************************************Select la collection
const User = mongoose.model("userGRH");

// *********************************Classe user REACT.JS
const userRoutes = express.Router();

// ************************************************************************ Create user
userRoutes.post("/Register-user",async( req, res )=>{
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
userRoutes.post("/edit_user",async( req, res )=>{
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
userRoutes.post("/login",async( req, res )=>{
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
// ********************************************************************* Show user
userRoutes.post("/userData",async( req, res )=>{
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

// ************************************************************************************
// *********************************Classe user EXPRES.JS******************************
// ************************************************************************ Index user

userRoutes.get("/user-ejs", async (req, res) => {
  try {
      const users = await User.find();
      console.log(users); // Add this line for debugging
      res.render("user/index", { users: users });
  } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
  }
});

// ************************************************************************ Create user
userRoutes.get("/create-user-ejs",async(req,res)=>{res.render("user/create",{ message : "" });});

// ************************************************************************ Store user
userRoutes.post("/Store-user-ejs",async( req, res )=>{
  const {user, tele, email, pass} = req.body ;
  try{
    const olduser = await User.findOne({email});
    if(olduser){
      return res.render("user/create", { message : "this user or email already Exist !" });
    }
    await User.create({user,tele,email,pass,valide:0,}).then(() => res.redirect('/user-ejs')); 
    console.log({user, tele, email, pass } );
  }catch(eror){
    res.send({ status:"error"})
  }
});

// ********************************************************************** Show user
userRoutes.get("/show-user-ejs/:id",async(req,res)=>{
  const user = await User.find({ _id: req.params.id });
  res.render("user/show",{
      user : user
  });
})

// ********************************************************************* Edit user
userRoutes.get("/edite-user-ejs/:id",async(req,res)=>{
  const user = await User.find({ _id: req.params.id });
  res.render("user/edit",{
      user : user
  });
})

// ********************************************************************* Update user
userRoutes.post('/update-user-ejs', (req, res) => {
  const {id, user, email, tele, pass} = req.body;
    User.updateOne({ _id: id },{$set:{"user":user,"email":email,"tele":tele,"pass":pass}})
    .then(() => res.redirect('/user-ejs'))
    .catch(error => res.status(400).json({ error }));
});

// ******************************************************************* Delete user
userRoutes.post("/delete-user-ejs/:id",async( req, res )=>{
  try{
    User.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('/user-ejs'));
  }catch (error) {res.send({ status:"error"})}
});
  
  
module.exports = userRoutes;