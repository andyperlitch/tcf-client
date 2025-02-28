import { gql } from "@apollo/client";

gql`
  fragment PhotoCarouselViewConfigFields on PhotoCarouselViewConfig {
    maxSubmissionsPerUser
    askSharePermission
    sharePrompt
  }
  fragment PhotoCarouselViewDataFields on PhotoCarouselViewData {
    visibleSubmission
  }
  fragment PhotoCarouselSubmissionFields on PhotoCarouselSubmissionData {
    photoUrl
    caption
    approved
    sharingPermissionGranted
  }
  fragment PhotoCarouselAdminConfigFields on PhotoCarouselAdminConfig {
    maxSubmissionsPerUser
    requireApproval
    askSharePermission
    sharePrompt
    pollInterval
  }
  fragment PhotoCarouselAdminDataFields on PhotoCarouselAdminData {
    visibleSubmission
    rejectedQueue
    unapprovedQueue
    unseenQueue
    seenQueuePointer
    seenQueue
  }

  query photoCarouselDownload($engagementId: Int!) {
    photoCarouselDownload(engagementId: $engagementId) {
      success
      message
      downloadUrl
    }
  }
`;
