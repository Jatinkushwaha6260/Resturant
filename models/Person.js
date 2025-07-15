const mongoose = require('mongoose');

const bcrypt =require('bcrypt');

// Define the Person Schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
     age: {
        type: Number,
        required: true
    },
     work: {
        type: String,
        enum: ['chef' , 'waiter' , 'manager'],
        required: true
    },
     mobile: {
        type: Number,
        required: true
    },
     email: {
        type: String,
        required: true,
        unique: true
    },
     address: {
        type: String,
        required: true
    },
     salary: {
        type: Number,
        required: true
    },
     username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save' , async function(next){
    const person = this;
    // hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();


    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password , salt);

        // override the plain password with the hashed one
        person.password = hashedPassword;
       

        next();

    }catch(err){
        return next(err);

    } 
})


personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // use bcrypt to compare the provided password with the hashed password
       const isMatch = await bcrypt.compare(candidatePassword , this.password);
        
        return isMatch;

    }catch(err){
        throw err;
    }
}

// complete logic check the password from database
// prince ---> iijfiwjowdoqsqqosqax3grg
// login ---> agrawal

// iijfiwjowdoqsqqosqax3grg --> extract salt
// salt+agrawal -- hash --> cncsjscnwuhdwioaoei92ury3
// finaly compare the password
// iijfiwjowdoqsqqosqax3grg == cncsjscnwuhdwioaoei92ury3 



// Create Person model
const Person = mongoose.model('Person' , personSchema);
module.exports = Person;