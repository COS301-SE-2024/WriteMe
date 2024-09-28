import { type NextUploadConfig } from 'next-upload/client';
import { NextUpload } from 'next-upload';

export const config: NextUploadConfig = {
  maxSize: '5mb',
  bucket: NextUpload.bucketFromEnv('writeme'),
  client: {
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
      secretAccessKey: process.env.S3_SECRET_KEY,
      accessKeyId: process.env.S3_ACCESS_KEY,
    },
  },
};