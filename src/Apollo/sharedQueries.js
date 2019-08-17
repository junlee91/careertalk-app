import { gql } from 'apollo-boost';

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

export const GET_CACHED_FAIRS = gql`
  {
    getFair {
      id
      name
      address
      num_of_employers
      date
      start_time
      end_time
      location
    }
  }
`;

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
