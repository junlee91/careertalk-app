import gql from 'graphql-tag';

export const FAVORITE_FRAGMENT = gql`
  fragment FavoriteParts on Favorite {
    id
    employerIds
  }
`;
