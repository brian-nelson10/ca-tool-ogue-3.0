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