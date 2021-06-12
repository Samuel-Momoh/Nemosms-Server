
import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';
 
import { isAuthenticated, isNotificationOwner } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');
 
const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    notifications: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
      ? {
          where: {
            createdAt: {
               [Sequelize.Op.lt]: fromCursorHash(cursor),
            },
          },
        }
      : {};
      const notifications = await models.Notification.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });
      const hasNextPage = notifications.length > limit;
      const edges = hasNextPage ? notifications.slice(0, -1) : notifications;
      return {
        edges,
        notificationPageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString(),
          ),
        },
      };
    },
    notification: async (parent, { id }, { models }) => {
      return await models.Notification.findByPk(id);
    },
  },
 
  Mutation: {
    createNotification: combineResolvers(
      // isAuthenticated,
      async (parent, { title,message,status }, { models, me }) => {
        return await models.Notification.create({
          title,
          message,
          status,
          userId: me.id,
        });
      },
    ),
 
    deleteNotification: combineResolvers(
      isAuthenticated,
      isNotificationOwner,
      async (parent, { id }, { models }) => {
        return await models.Notification.destroy({ where: { id } });
      },
    ),
  },
 
  Notification: {
    user: async (message, args, { models }) => {
      return await models.User.findByPk(message.userId);
    },
  },
};