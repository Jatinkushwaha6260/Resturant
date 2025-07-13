const express = require('express')
const router = express.Router();
const Person = require('./../models/Person');

 // POST route to add a person
router.post('/' , async (req , res) => {
 try{
    const data = req.body; // Assuming the request body contains the person data

    // Create a new person document using the mongoose model
    const newPerson = new Person(data)

    // Save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);

 }catch(err){
   console.log(err);
   response.status(500).json({error: 'Internal Server Error'});
 }
})

// Get method to get the person
router.get('/' , async (req , res) => {
   try{
      const data = await Person.find();
      console.log('data fatched');
    res.status(200).json(data);

   }catch(err){
console.log(err);
   response.status(500).json({error: 'Internal Server Error'});
   }

})

// Update method for person
router.put('/:id' , async (req , res) => {
   try{
      const personId = req.params.id; // Extract the id from the IRL parameter
      const updatedPersonData = req.body; // Updated data for the person
      const response = await Person.findByIdAndUpdate(personId , updatedPersonData , {
         new: true, // Return the updated document
         runValidators: true, // Run mongoose validation;

      })

      if(!response){
         return res.status(404).json({error: 'Person not found'});
      }

      console.log('Data updated');
      res.status(200).json(response);
   }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
   }
})

// delete method for person
router.delete('/:id' , async (req , res) => {
   try{
      const personId = req.params.id; // Extract the person's id from the URL parameter
      
      // Assuming you have a person model
      const response = await Person.findByIdAndDelete(personId);

      if(!response){
         return res.status(404).json({error: 'Person not found'});
      }

      console.log('data delete');
      res.status(200).json({message: 'person deleted successfully'});

   }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});

   }

});




module.exports = router;