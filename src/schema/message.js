import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    messages(cursor: String, limit: Int): MessageConnection!
    message(id: ID!): Message!
  }

  extend type Mutation {
    sendMessage(sender: String!,reciever: String!,text: String!,schedule: String!): Message!
    scheduleMessage(sender: String!,reciever: String!,text: String!,schedule: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }
  type MessageConnection {
    edges: [Message!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }
 
  type Message {
    id: ID!
    sender: String!
    reciever: String!
    text: String!
    schedule: String!
    createdAt: Date!
    user: User!
  }


`;
