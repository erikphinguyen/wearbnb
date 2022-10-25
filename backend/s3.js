import dotenv from 'dotenv';
import aws from 'aws-sdk';

dotenv.config();

const region = "us-west-1";
const bucketName = "wearbnb";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: '4'
});
