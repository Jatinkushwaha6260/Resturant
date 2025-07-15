const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person'); // Adjust your path

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      //console.log('Received credentials:', username, password);
      const user = await Person.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      // If using bcrypt
     // const isPasswordMatch = await bcrypt.compare(password, user.password);
    const isPasswordMatch = await user.comparePassword(password);

      // const isPasswordMatch = user.password === password ? true : false; 
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password' });
      }

    } catch (err) {
      return done(err);
    }
  }
));


module.exports = passport;
