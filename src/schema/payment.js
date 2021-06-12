import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    payments(cursor: String, limit: Int): PaymentConnection!
    payment(id: ID!): Payment!
  }

  extend type Mutation {
    createPayment(paymentid: String!,channel: String!,name: String!,email: String!,amount: String!,naration: String!,status: String!): Payment!
  }
  type PaymentConnection {
    edges: [Payment!]!
    pageInfo: paymentPageInfo!
  }

  type paymentPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }
 
  type Payment {
    id: ID!
    paymentid: String!
    channel: String!
    name: String!
    email: String!
    amount: String!
    naration: String!
    status: String!
    createdAt: Date!
    user: User!
  }


`;
