import { gql } from 'apollo-boost';

/**
 * Query for getting fair info from cache
 */
export const FAIRS_LOCAL = gql`
  {
    getFairCache @client
  }
`;
