import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    services(cursor: String, limit: Int): ServiceConnection!
    service(id: ID!): Service!
  }

  extend type Mutation {
    createService(name: String!,status: String!): Service!
    deleteService(id: ID!): Boolean!
  }
  type ServiceConnection {
    edges: [Service!]!
    pageInfo: servicePageInfo!
  }

  type servicePageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }
 
  type Service {
    id: ID!
    name: String!
    status: String!
    expire: String!
    createdAt: Date!
    user: User!
  }


`;