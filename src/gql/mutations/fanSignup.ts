import { gql } from "@apollo/client";

gql`
  mutation fanSignup($data: SignupInput!) {
    signup(data: $data) {
      id
      name
      role
    }
  }
`;
