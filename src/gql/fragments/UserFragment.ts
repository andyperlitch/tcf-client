import { gql } from "@apollo/client";

gql`
  fragment User on User {
    id
    name
    email
    role
    username
    lastLogin
  }
`;
