import { gql } from "@apollo/client";

export const login = gql`
  mutation login($emailOrUsername: String!, $password: String!) {
    login(emailOrUsername: $emailOrUsername, password: $password) {
      id
      email
      name
      username
      role
    }
  }
`;
