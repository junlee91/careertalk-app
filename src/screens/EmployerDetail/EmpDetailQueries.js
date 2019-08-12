import { gql } from 'apollo-boost';

/**
 * Query for getting fair info from cache
 */
export const FAIRS_LOCAL = gql`
  {
    getFairCache @client
  }
`;

export const GET_NOTE = gql`
  query getNote($fairId: String!, $employerId: String!) {
    getNote(fairId: $fairId, employerId: $employerId)
  }
`;

export const SAVE_NOTE = gql`
  mutation saveNote($fairId: String!, $employerId: String!, $content: String) {
    saveNote(fairId: $fairId, employerId: $employerId, content: $content) {
      message
      status
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation deleteNote($fairId: String!, $employerId: String!) {
    deleteNote(fairId: $fairId, employerId: $employerId) {
      message
      status
    }
  }
`;
