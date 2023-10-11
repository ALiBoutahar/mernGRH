const express = require("express");
const mongoose = require("mongoose");
require("../model/personnes");

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/images/files-persones'); // Store uploads in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'image' || file.fieldname === 'cv') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type for ' + file.fieldname));
    }
  },
});
// const upload = multer({ storage: storage });

// **************************************************************Select la collection
const Personne = mongoose.model("personnesGRH");

// ************************************ classe personne React.js
const personeRoutes = express.Router();

// ********************************************************************* Index personne
personeRoutes.post("/persone",async(req, res)=>{
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

// ********************************************************************** Create personne
personeRoutes.post("/Add_persone",upload.fields([{ name: 'image', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), async( req, res )=>{
  const  {cin, nom, prenom, email, tele, naissance, service, competance, type, valide} = req.body ;
  try{
    console.log(req.files);
    const image = req.files['image'][0].filename; // Assuming only one image is allowed
    const cv = req.files['cv'][0].filename; // Assuming only one CV is allowed
    console.log(image,cv);
    await Personne.create({cin, nom, prenom, email, tele, naissance, image, cv, service, competance, type, valide});  
    res.send({ status:"Data inserted"});
    console.log({ cin, nom, prenom, email, tele, naissance,  image, cv, service, competance, type, valide } );
  }catch(eror){
    res.send({ status:"error"})
  }
});

// ******************************************************************* Delete personne
personeRoutes.post("/sup_personne",async( req, res )=>{
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
personeRoutes.post("/edit_personne",async( req, res )=>{
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

// ********************************************************************* Show personne
personeRoutes.post("/persone_data",async( req, res )=>{
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










// ************************************************************************************
// *********************************Classe personne EXPRES.JS******************************
// ************************************************************************ Index personne


personeRoutes.get("/personne-ejs", async (req, res) => {
  try {
      const personnes = await Personne.find();
      console.log(personnes); // Add this line for debugging
      res.render("personne/index", { personnes: personnes });
  } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
  }
});

// ************************************************************************ Create personne
personeRoutes.get("/create-personne-ejs",async(req,res)=>{res.render("personne/create",{ message : "" });});

// ************************************************************************ Store personne
personeRoutes.post("/Store-personne-ejs",async( req, res )=>{
  const {cin, nom, prenom, email, tele, naissance, service} = req.body ;
  try{
    const old = await Personne.findOne({"cin":cin});
    if(old){
      return res.render("personne/create", { message : "this personne or cin already Exist !" });
    }
    await Personne.create({cin, nom, prenom, email, tele, naissance, service}).then(() => res.redirect('/personne-ejs')); 
  }catch(eror){
    res.send({ status:"error"})
  }
});

// ********************************************************************** Show personne
personeRoutes.get("/show-personne-ejs/:id",async(req,res)=>{
  const personne = await Personne.find({ _id: req.params.id });
  res.render("personne/show",{
    personne : personne
  });
})

// ********************************************************************* Edit personne
// personeRoutes.get("/edite-personne-ejs/:id",async(req,res)=>{
//   const personne = await Personne.find({ _id: req.params.id });
//   res.render("personne/edit",{
//     personne : personne
//   });
// })

// ********************************************************************* Update personne
// personeRoutes.post('/update-personne-ejs', (req, res) => {
//   const {id, user, email, tele, pass} = req.body;
//     Personne.updateOne({ _id: id },{$set:{"user":user,"email":email,"tele":tele,"pass":pass}})
//     .then(() => res.redirect('/personne-ejs'))
//     .catch(error => res.status(400).json({ error }));
// });

// ******************************************************************* Delete personne
personeRoutes.post("/delete-personne-ejs/:id",async( req, res )=>{
  try{
    Personne.deleteOne({ _id: req.params.id })
    .then(() => res.redirect('/personne-ejs'));
  }catch (error) {res.send({ status:"error"})}
});

module.exports = personeRoutes;