// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// checkedInBy is friends
//need to make tools like friends. add them delete them.
const typeDefs = gql`
type Tool {
    _id: ID
    toolName: String
    createdAt: String
    username: String
    noteCount: Int
    checkedIn: Boolean
    checkedInBy: [User] 
    notes: [Note]
  }

type Note {
    _id: ID
    noteBody: String
    createdAt: String
    username: String
}

type User {
    _id: ID
    username: String
    email: String
    toolCount: Int
    tools: [Tool]
  }

type Query {
    users: [User]
    user(username: String!): User
    tools(checkedInBy: String): [Tool]
    tool(_id: ID!): Tool
  }`;

// export the typeDefs
module.exports = typeDefs;