import { gql } from "@apollo/client";

gql`
  mutation adminDeleteFromS3($key: String!) {
    adminDeleteFromS3(key: $key)
  }
`;
