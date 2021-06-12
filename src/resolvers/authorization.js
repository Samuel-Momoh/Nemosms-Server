import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';
 
export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');
  
  export const isAdmin = combineResolvers(
    isAuthenticated,
    (parent, args, { me: { role } }) =>
      role === 'ADMIN'
        ? skip
        : new ForbiddenError('Not authorized as admin.'),
  );
  export const isMessageOwner = async (
    parent,
    { id },
    { models, me },
  ) => {
    const message = await models.Message.findByPk(id, { raw: true });
   
    if (message.userId !== me.id) {
      throw new ForbiddenError('Not authenticated as owner.');
    }
   
    return skip;
  };
  
  export const isContactOwner = async (
    parent,
    { id },
    { models, me },
  ) => {
    const contact = await models.Contact.findByPk(id, { raw: true });
   
    if (contact.userId !== me.id) {
      throw new ForbiddenError('Not authenticated as owner.');
    }
   
    return skip;
  };

  export const isNotificationOwner = async (
    parent,
    { id },
    { models, me },
  ) => {
    const contact = await models.Notification.findByPk(id, { raw: true });
   
    if (contact.userId !== me.id) {
      throw new ForbiddenError('Not authenticated as owner.');
    }
   
    return skip;
  };

  export const isLongOwner = async (
    parent,
    { id },
    { models, me },
  ) => {
    const longNumber = await models.LongNumber.findByPk(id, { raw: true });
   
    if (longNumber.userId !== me.id) {
      throw new ForbiddenError('Not authenticated as owner.');
    }
   
    return skip;
  };