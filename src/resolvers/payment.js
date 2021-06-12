
import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';
const axios = require('axios');
import { isAuthenticated } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');
 
const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    payments: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
      ? {
          where: {
            createdAt: {
               [Sequelize.Op.lt]: fromCursorHash(cursor),
            },
          },
        }
      : {};
      const payments = await models.Payment.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });
      const hasNextPage = payments.length > limit;
      const edges = hasNextPage ? payments.slice(0, -1) : payments;
      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString(),
          ),
        },
      };
    },
    payment: async (parent, { id }, { models }) => {
      return await models.Payment.findByPk(id);
    },
  },
 
  Mutation: {
    createPayment: combineResolvers(
      // isAuthenticated,
      async (parent, { paymentid,channel,name,email,amount,naration,status }, { models, me }) => {
        const response =  axios.post('https://remitademo.net/remita/exapp/api/v1/send/api',
        {
          username: 'UzAwMDAzNDE2OTZ8MTA3ODc2NjM0OTMzfGU5NGY4YmRmZTFmN2QwNDljZTcxYTA5MzIyMWQxZGQ0ZjZjZDFkYTlmYmI1NzNjNDg2OTRmNjkxNDI2ZDYzMmMwYThlYzFjNjBkNTEzMmI2NzE2ZjM1ZDFhODk0ZDg2MTdkNWUxMzg2NTFlN2FhZjA1NDdmMTcyOWEwZTBlZjM3',
          password: '8fde825b6983806a051068d4e99eab5abc7434cf4a708f409a615ad6562ae850400147e23c347fbfedab376728a5f5b680c940a22a53791228086c9416d4caf7'
        }
        );
        console.log(response)
        return await models.Payment.create({
            paymentid,
            channel,
            name,
            email,
            amount,
            naration,
            status,
          userId: me.id,
        });
      },
    ),
  },
 
  Payment: {
    user: async (payment, args, { models }) => {
      return await models.User.findByPk(payment.userId);
    },
  },
};