import { gql } from 'apollo-server-express';

export default gql`
 
  extend type Mutation {
    passwordRecovery(email: String!):Boolean!
    resetUserPassword(token: String!,email: String!,password: String!): Boolean!
  }
 
`;