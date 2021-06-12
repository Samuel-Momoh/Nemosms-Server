import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';
var uniqid = require('uniqid');
const expireDate =  () =>{
  const dt = new Date();
  const expireDate = new Date(dt.getTime() + 30*60000);
  return  expireDate ;
}
const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  const expire = expireDate();

  return await jwt.sign({ id, email, username, role,expire, }, secret, {
    expiresIn,
  });
};
export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models ,me}) => {

      return await models.User.findOne({ where: { email: me.email } });
    },
    
    refresh_token:combineResolvers( 
      isAuthenticated,
      async (parent, { _ }, { me,res,secret}) => {

      const timeLeft =  new Date(me.expire) - new Date() 

      const timeLeftMinutes =  Math.floor((timeLeft/1000/60))

      if(timeLeftMinutes < 5){

        const cookieToken = await jwt.sign({ id: me.id, email: me.email, username: me.username, role: me.role,expire: expireDate(), }, secret, {expiresIn:"30m",});;

        res.cookie("login",cookieToken,{httpOnly: true,maxAge: 30*60000, expires: expireDate() })
        return {minutes: 30*60000}
      }
      console.log(timeLeftMinutes)
      return {minutes: timeLeft}
    },
    )
  },
  Mutation: {
    signUp: async (
      parent,
      {  email, password,phone,name },
      { models, secret,res },
    ) => {
      const user = await models.User.create({
        name,
        username: uniqid('nemosms-'),
        email,
        phone,
        password,
      });

      const cookieToken = await createToken(user, secret, '30m');

      res.cookie("login",cookieToken,{httpOnly: true,maxAge: 30*60000, expires: expireDate() })

      return { token: "true" };
    },
    signIn: async (
      parent,
      { login, password },
      {models,secret,res},
    ) => {
      const user = await models.User.findByLogin(login);
 
      if (!user) {
        throw new AuthenticationError('No user found with this login credentials.');
      }
 
      const isValid = await user.validatePassword(password);
 
      if (!isValid) {
        throw new AuthenticationError('Invalid password');
      }


      const cookieToken = await createToken(user, secret, '30m');

      res.cookie("login",cookieToken,{httpOnly: true,maxAge: 30*60000, expires: expireDate() })

      return { token: "true" };
    },
    signOut:combineResolvers( 
      isAuthenticated,
     async (parent, { id }, { models ,me,res}) => {

      res.clearCookie("login")
      return true;
    },
    )
  },
  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: user.id,
        },
      });
    },
  },
};