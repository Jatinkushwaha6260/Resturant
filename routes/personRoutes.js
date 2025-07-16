const express = require('express')
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware , generateToken} = require('./../jwt');

 // POST route to add a person
router.post('/signup' , async (req , res) => {
 try{
    const data = req.body; // Assuming the request body contains the person data

    // Create a new person document using the mongoose model
    const newPerson = new Person(data)


    // Save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');

    const payload =  {
      id: response.id,
      username: response.username
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is: " , token);
    res.status(200).json({response: response , token: token});

 }catch(err){
   console.log(err);
   response.status(500).json({error: 'Internal Server Error'});
 }
})

// Login route
router.post('/login',async(req , res) => {
   try{
      // Extract username and password from request body
      const {username , password} = req.body;

      // Find the user by username
      const user = await Person.findOne({username: username});

      // If user does not exist or password does not match , return error
      if(!user || !(await user.comparePassword(password))){
         return res.status(401).json({error: 'Invalid username or password'});
      }

      // generate Token
      const payload = {
         id: user.id,
         username: user.username
      }
      const token = generateToken(payload);

      // return token as response
      res.json({token});

   }catch(err){
      console.error(err);
      res.status(500).json({error: 'Internal server error'});

   }
})



// Get method to get the person
router.get('/' ,jwtAuthMiddleware, async (req , res) => {
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