import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user: User
    refresh_token: Expires!
  }
  extend type Mutation {
    signUp(
      name: String!
      email: String!
      phone: String!
      password: String!
    ): Token!
    signIn(login: String!, password: String!): Token!
    signOut: Boolean!
  }
 
  type Expires {
    minutes: Int!
  }
 
  type Token {
    token: String!
  }
 
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    role: String
    messages: [Message!]
  }
`;
