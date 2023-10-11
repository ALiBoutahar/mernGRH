const express = require("express");
const mongoose = require("mongoose");
const Personne = mongoose.model("personnesGRH");

const absanceRoutes = express.Router();

absanceRoutes.post("/ajouter-absence", async (req, res) => {
  try {
    const absences = req.body.absences; // Assuming "absances" matches the key in the object sent from the client

    // Loop through each absence and add it to the corresponding person
    for (const absence of absences) {
      const { id, date, notif } = absence;

      // Find the person by their unique identifier (_id)
      const person = await Personne.findOne({ _id: id });

      if (!person) {
        console.log(`Person with _id ${id} not found`);
        // You can choose to continue processing other absences or stop here
        continue;
      }

      // Insert the absence into the absences array
      person.absences.push({ date, notif });

      // Save the updated person document
      await person.save();
      console.log(`Absence added for person with _id ${id}`);
    }

    res.status(200).json({ status: "ok", message: "Absences added successfully" });
  } catch (error) {
    console.error("Error adding absences:", error);
    res.status(500).json({ status: "Error adding absences" });
  }
});


module.exports = absanceRoutes;
