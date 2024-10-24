import { gql } from "@apollo/client";

export const whoami = gql`
  query whoami {
    whoami {
      id
      email
      username
      name
      lastLogin
      role
    }
  }
`;
