import { gql } from "@apollo/client";

gql`
  query adminGetUsers($filter: UserFilter) {
    users(filter: $filter) {
      ...User
    }
  }
`;
