
import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';
 
import { isAuthenticated, isContactOwner} from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');
 
const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    contacts: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
      ? {
          where: {
            createdAt: {
               [Sequelize.Op.lt]: fromCursorHash(cursor),
            },
          },
        }
      : {};
      const contacts = await models.Contact.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });
      const hasNextPage = contacts.length > limit;
      const edges = hasNextPage ? contacts.slice(0, -1) : contacts;
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
    contact: async (parent, { id }, { models }) => {
      return await models.Contact.findByPk(id);
    },
  },
 
  Mutation: {
    createContact: combineResolvers(
      isAuthenticated,
      async (parent, { name,number }, { models, me }) => {
        return await models.Contact.create({
          name,
          number,
          userId: me.id,
        });
      },
    ),
 
    deleteContact: combineResolvers(
      isAuthenticated,
      isContactOwner,
      async (parent, { id }, { models }) => {
        return await models.Contact.destroy({ where: { id } });
      },
    ),
  },
 
  Contact: {
    user: async (contact, args, { models }) => {
      return await models.User.findByPk(contact.userId);
    },
  },
};