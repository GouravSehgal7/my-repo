const User = require('../models/user');


const AuthResolver = {
  Query: {
    user: async () => {
      try {
        return await User.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    oneuser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
  Mutation: {
    register: async (_,{ username, emailid, password }) => {
      const existingUser = await User.findOne({ emailid });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await hashpassword(password)
      const user = new User({
        username,
        emailid,
        password: hashedPassword,
      });

      await user.save();

      const token =await  generatetoken(user)

      return { token };
    },
    login: async (_,__,{ emailid, password }) => {
  
      try {
        const user = await User.findOne({ emailid:emailid });
        console.log("tftft");
        if (!user) {
          throw new Error("This email does not exist");
        }
        console.log("kjv");
        const ismatchpass = await comparepass(password, user.password);
        if (!ismatchpass) {
          throw new Error("Invalid credentials");
        }
        console.log("as");
        const token = generatetoken(user);
        return { token };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = AuthResolver;
