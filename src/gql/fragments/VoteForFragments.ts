import { gql } from "@apollo/client";

gql`
  fragment VoteForConfigFields on VoteForConfig {
    votesPerUser
  }
  fragment VoteForDataFields on VoteForData {
    votes {
      submissionId
      count
    }
  }
`;
