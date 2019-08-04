import { gql } from 'apollo-boost';

/**
 * Query for getting employer list from cache
 */
export const EMPLOYERS_LOCAL = gql`
  query getEmployersCache(
    $fairId: String
    $isUser: Boolean
    $hiringFilter: [String]
    $degreeFilter: [String]
    $majorFilter: [String]
    $visaFilter: Boolean
  ) {
    getEmployerListCache(
      fairId: $fairId
      isUser: $isUser
      hiringFilter: $hiringFilter
      degreeFilter: $degreeFilter
      majorFilter: $majorFilter
      visaFilter: $visaFilter
    ) @client
  }
`;

export const EMPLOYERS = gql`
  query getEmployers($fairId: String, $isUser: Boolean) {
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

export const TOGGLE_LIKE = gql`
  mutation toggleLike($fairId: String, $employerId: String) {
    likeEmployer(fairId: $fairId, employerId: $employerId) {
      message
      status
    }
  }
`;
