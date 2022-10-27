import { gql } from '@apollo/client';

export const QUERY_TOOLS = gql`
  query tools($username: String) {
    tools(username: $username) {
      _id
      toolName
      createdAt
      username
      noteCount
      notes {
        _id
        createdAt
        username
        noteBody
      }
    }
  }
`;

export const QUERY_TOOL = gql`
  query tools($username: String) {
    tools(username: $username) {
      _id
      toolName
      createdAt
      username
      noteCount
      notes {
        _id
        createdAt
        username
        noteBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      toolCount
      checkedInBy {
        _id
        toolName
      }
      tools {
        _id
        toolName
        createdAt
        noteCount
      }
    }
  }
`;