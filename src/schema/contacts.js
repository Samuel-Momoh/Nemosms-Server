import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    contacts(cursor: String, limit: Int): ContactConnection!
    contact(id: ID!): Contact!
  }

  extend type Mutation {
    createContact(name: String!,number: String!): Contact!
    deleteContact(id: ID!): Boolean!
  }
  type ContactConnection {
    edges: [Contact!]!
    pageInfo: contactPageInfo!
  }

  type contactPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }
 
  type Contact {
    id: ID!
    name: String!
    number: String!
    createdAt: Date!
    user: User!
  }


`;