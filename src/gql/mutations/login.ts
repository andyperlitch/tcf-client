import { gql } from "@apollo/client";

export const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
      username
      role
    }
  }
`;
