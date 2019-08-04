import { gql } from 'apollo-boost';

export const GOOGLE_SIGN_IN = gql`
  mutation userLogin($tokenId: String!, $googleId: String!) {
    userLogin(tokenId: $tokenId, googleId: $googleId)
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;
