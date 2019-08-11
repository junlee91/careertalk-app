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
