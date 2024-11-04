import { gql } from "@apollo/client";

gql`
  fragment VoteForConfigFields on VoteForConfig {
    votesPerUser
  }
  fragment VoteForDataFields on VoteForData {
    voteCounts {
      submissionId
      count
    }
  }
`;
