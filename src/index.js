import jwt from 'jsonwebtoken';
import 'dotenv/config';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
var cookieParser = require('cookie-parser')


import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

const app = express();

app.use(cookieParser())

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true 
};
app.use(cors(corsOptions));


const getMe = async req => {
  const token = req.headers.cookie;
  // console.log(token)
  if (token) {
    try {
      return await jwt.verify(token.split('=')[1], process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req, res }) => {
    
    const me = await getMe(req);
 
    return {
      models,
      me,
      res:res,
      secret: process.env.SECRET,
    };
  },
});

server.applyMiddleware({ app, path: '/graphql', cors: false });

 
sequelize.sync().then(async () => {
app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
});


