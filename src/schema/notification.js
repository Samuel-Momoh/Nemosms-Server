import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    notifications(cursor: String, limit: Int): NotificationConnection!
    notification(id: ID!): Notification!
  }

  extend type Mutation {
    createNotification(title: String!,message: String!,status: String!): Notification!
    deleteNotification(id: ID!): Boolean!
  }
  type NotificationConnection {
    edges: [Notification!]!
    pageInfo: notificationPageInfo!
  }

  type notificationPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }
 
  type Notification {
    id: ID!
    title: String!
    message: String!
    status: String!
    createdAt: Date!
    user: User!
  }


`;