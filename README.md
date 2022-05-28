
Unfortunatly, NodeJS ver 16 doesnt work well with AWS-SDK, so the app must run on NodeJS ver 14

For security reasons, the access key and secret access key to s3 removed from the code, so you need to enter them manually in src/s3/s3.service.ts.
