
import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';
 
import { isAuthenticated, isLongOwner } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');
 
const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    longNumbers: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
      ? {
          where: {
            createdAt: {
               [Sequelize.Op.lt]: fromCursorHash(cursor),
            },
          },
        }
      : {};
      const longNumbers = await models.Contact.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });
      const hasNextPage = longNumbers.length > limit;
      const edges = hasNextPage ? longNumbers.slice(0, -1) : longNumbers;
      return {
        edges,
        longNumberPageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString(),
          ),
        },
      };
    },
    longNumber: async (parent, { id }, { models }) => {
      return await models.LongNumber.findByPk(id);
    },
  },
 
  Mutation: {
    createlongNumber: combineResolvers(
      isAuthenticated,
      async (parent, { number,purpose,channel,expire,status }, { models, me }) => {
        return await models.LongNumber.create({
          number,
          purpose,
          channel,
          expire,
          status,
          userId: me.id,
        });
      },
    ),
 
    deletelongNumber: combineResolvers(
      isAuthenticated,
      isLongOwner,
      async (parent, { id }, { models }) => {
        return await models.LongNumber.destroy({ where: { id } });
      },
    ),
  },
 
  LongNumber: {
    user: async (longNumber, args, { models }) => {
      return await models.User.findByPk(longNumber.userId);
    },
  },
};