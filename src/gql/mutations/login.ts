import { gql } from "@apollo/client";

gql`
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
