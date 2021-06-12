import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    longNumbers(cursor: String, limit: Int): longNumberConnection!
    longNumber(id: ID!): LongNumber!
  }

  extend type Mutation {
    createlongNumber(number: String!,purpose: String!,channel: String!,expire: String!,status: String!): LongNumber!
    deletelongNumber(id: ID!): Boolean!
  }
  type longNumberConnection {
    edges: [LongNumber!]!
    pageInfo: longNumberPageInfo!
  }

  type longNumberPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }
 
  type LongNumber {
    id: ID!
    number: String!
    purpose: String!
    channel: String!
    expire: String!
    status: String!
    createdAt: Date!
    user: User!
  }


`;
