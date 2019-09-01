import { gql } from 'apollo-boost';

export const TOP_EMPLOYERS = gql`
  query getTopEmployerList($fairId: String) {
    getTopEmployerList(fairId: $fairId) {
      company_url
      id
      name
      rank
    }
  }
`;
