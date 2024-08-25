const { buildSchema } = require('graphql');

const Schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    emailid: String!
    token: String
  }

  type payload {
    token: String!
  }

  type Query {
    user: [User]
    oneuser(id: ID!): User
  }



  type Mutation {
    register(username: String! emailid:String! password: String! ): payload
    login(emailid:String! password: String!): payload
  }
`);

module.exports = Schema;
