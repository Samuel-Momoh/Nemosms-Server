import { gql } from 'apollo-server-express';

import userSchema from './user';
import messageSchema from './message';
import contactSchema from './contacts';
import notificationSchema from './notification';
import paymentSchema from './payment';
import serviceSchema from './service';
import longNumberSchema from './longNumber';
import passwordRecoverySchema from './passwordRecovery';
const linkSchema = gql`
scalar Date
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, messageSchema,contactSchema,notificationSchema,paymentSchema,serviceSchema,longNumberSchema,passwordRecoverySchema];
