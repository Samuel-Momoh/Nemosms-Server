
import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';
 
import { isAuthenticated } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');
 
const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    services: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
      ? {
          where: {
            createdAt: {
               [Sequelize.Op.lt]: fromCursorHash(cursor),
            },
          },
        }
      : {};
      const services = await models.Service.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });
      const hasNextPage = services.length > limit;
      const edges = hasNextPage ? services.slice(0, -1) : services;
      return {
        edges,
        servicePageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString(),
          ),
        },
      };
    },
    service: async (parent, { id }, { models }) => {
      return await models.Contact.findByPk(id);
    },
  },
 
  Mutation: {
    createService: combineResolvers(
      isAuthenticated,
      async (parent, { name,status,expire }, { models, me }) => {
        return await models.Contact.create({
          name,
          status,
          expire,
          userId: me.id,
        });
      },
    ),
  },
 
  Service: {
    user: async (service, args, { models }) => {
      return await models.User.findByPk(service.userId);
    },
  },
};