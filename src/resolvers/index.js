import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from '../resolvers/user';
import messageResolvers from '../resolvers/message';
import contactResolvers from '../resolvers/contact';
import notificationResolvers from '../resolvers/notificaton';
import paymentResolvers from '../resolvers/payment';
import serviceResolvers from '../resolvers/service';
import longNumberResolvers from '../resolvers/longNumber';
import passwordRecoveryResolvers from '../resolvers/passwordRecovery';

const customScalarResolver = {
    Date: GraphQLDateTime,
  };

export default [
  customScalarResolver,
  userResolvers,
  messageResolvers,
  contactResolvers,
  notificationResolvers,
  paymentResolvers,
  serviceResolvers,
  longNumberResolvers,
  passwordRecoveryResolvers
];
