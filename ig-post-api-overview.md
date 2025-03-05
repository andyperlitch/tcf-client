Instagram Posting API Overview
• Requires a Business or Creator Account
• You cannot post to personal accounts via API.
• Requires a Connected Facebook Page
• Instagram Business accounts must be linked to a Facebook page.
• Uses Graph API (Facebook’s API)
• You’ll need to authenticate via OAuth and get an access token.
• Supports Photo & Video Posting
• You can post images along with captions.

    Implementation Plan

1. Get Instagram API Access

   1. Convert your band’s Instagram to a Business or Creator account.
   2. Link it to a Facebook Page.
   3. Register as a Facebook App Developer.
   4. Create a Facebook App with Instagram Graph API access.
   5. Generate an Instagram Access Token.
      • Short-lived (valid for hours) but can be exchanged for a long-lived token (valid for 60 days).

   6. Authenticate and Get a Posting Token
      • Use OAuth login flow to request pages_manage_posts and instagram_basic permissions.
      • Exchange for a long-lived access token.

Example (Get Page Access Token):

```
curl -X GET "https://graph.facebook.com/v19.0/me/accounts?access_token={your-user-access-token}"
```

3. Upload a Photo to Instagram via Graph API

Step 1: Upload Image URL to Instagram
