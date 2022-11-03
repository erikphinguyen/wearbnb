require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

// from Alex
// const {AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_KEY} = require('./env')

// from Sam Meech-Ward
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

// uploads a file to s3
const uploadFile = (file) => {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// downloads a file from s3
const getFile = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}
exports.getFile = getFile;

// delete a file from s3
const deleteFile = (fileKey) => {
    const deleteParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.deleteObject(deleteParams).createReadStream();
}
exports.deleteFile = deleteFile;
