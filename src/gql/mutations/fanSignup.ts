import { gql } from "@apollo/client";

export const fanSignup = gql`
  mutation fanSignup($data: SignupInput!) {
    signup(data: $data) {
      id
      name
      role
    }
  }
`;
