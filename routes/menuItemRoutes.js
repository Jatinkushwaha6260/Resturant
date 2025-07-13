const express = require('express')
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


// Menu Item routes 
// menu item post route

router.post('/' , async (req , res) => {
   try{
        const menudata = req.body;
        const newMenu = new MenuItem(menudata);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);

   }catch(err){
      console.log(err);
     response.status(500).json({error: 'Internal Server Error'});
   
   }
})

// menu item get route
router.get('/' , async (req , res) => {
   try{
      const menuItems =  await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(menuItems);

   }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});

   }
})


// parametarized  get route for the menuitem
router.get('/:tasteType' , async (req , res) => {
   try{
      const tasteType = req.params.tasteType; // extract the tasteType from the URL parameter
      if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
         const response = await MenuItem.find({taste: tasteType});
         console.log('response fetched');
         res.status(200).json(response);
      }else{
         res.status(404).json({error: 'Invalid taste type'});
      }

   }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});

   }

})

// next method  of menu  item

module.exports = router;