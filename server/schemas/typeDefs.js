// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// checkedInBy is friends
//need to make tools like friends. add them delete them.
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    toolCount: Int
    tools: [Tool]
    checkedInBy: [Tool]
  }

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

type Auth {
    token: ID!
    user: User
  }

type Query {
    me: User
    users: [User]
    user(username: String!): User
    tools(checkedInBy: String): [Tool]
    tool(_id: ID!): Tool
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addTool(toolName: String!): Tool
    addNote(toolId: ID!, noteBody: String!): Tool
    addcheckedInBy(checkedInById: ID!): User

  }`;

// export the typeDefs
module.exports = typeDefs;