import { gql } from 'apollo-boost';

import { FAVORITE_FRAGMENT, NOTE_FRAGMENT } from './fragments';

export const ISLOGGEDIN_QUERY = gql`
  {
    isLoggedIn @client
  }
`;

export const LOCAL_LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export const GET_SOCIAL_PROVIDER = gql`
  {
    socialProvider @client
  }
`;

// ---------- FAVORITES ---------- //
export const GET_FAVORITES = gql`
  {
    favorites @client {
      ...FavoriteParts
    }
  }
  ${FAVORITE_FRAGMENT}
`;

export const UPDATE_FAVORITES = gql`
  mutation updateFavoritesCache(
    $mode: String!
    $fairId: String!
    $employerId: String!
    $employerIds: [String]
  ) {
    updateFavoritesCache(
      mode: $mode
      fairId: $fairId
      employerId: $employerId
      employerIds: $employerIds
    ) @client
  }
`;
// -------------------------------- //

// ------------ NOTES ------------ //
export const GET_NOTES = gql`
  {
    notes @client {
      ...NoteParts
    }
  }
  ${NOTE_FRAGMENT}
`;

export const UPDATE_NOTES = gql`
  mutation updateNotesCache(
    $mode: String!
    $fairId: String!
    $employerId: String!
    $employerIds: [String]
  ) {
    updateNotesCache(
      mode: $mode
      fairId: $fairId
      employerId: $employerId
      employerIds: $employerIds
    ) @client
  }
`;
// -------------------------------- //

export const GET_CACHED_EMPLOYERS = gql`
  query getEmployerListCache($fairId: String!, $isUser: Boolean!) {
    getEmployerList(fairId: $fairId, isUser: $isUser) {
      companies {
        id
        degree_requirements
        hiring_majors
        hiring_types
        tables
        visa_support
        careerfair_id
        is_liked
        is_noted
        employer {
          id
          name
          company_url
        }
      }
      fair {
        id
        name
        date
        start_time
        end_time
      }
    }
  }
`;

export const ME = gql`
  query me {
    me {
      personal_email
      profile_url
      full_name
    }
  }
`;
