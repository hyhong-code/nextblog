// ENV VARS:
// AWS_ACCESS_KEY_ID=XXX
// AWS_SECRET_KEY=XXX
// AWS_REGION=us-west-2
// AWS_S3_BUCKET_NAME=XXX
// AWS_S3_BUCKET_ACL=public-read
// AWS_S3_BUCKET_CONTENT_TYPE=image/jpg

const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const s3 = new AWS.S3();

// Transform image into buffer and upload s3
exports.s3UploadImage = async (image, colectionName) => {
  // Process Image data
  const imageBase64Buffer = new Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const imageType = image.split(";")[0].split("/")[1];

  const s3UploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${colectionName}/${uuidv4()}.${imageType}`,
    Body: imageBase64Buffer,
    ACL: process.env.AWS_S3_BUCKET_ACL, // public-read -> so users can view image
    ContentType: `image/${imageType}`,
    ContentEncoding: "base64",
  };

  return await s3.upload(s3UploadParams).promise();

  //  { Location: 'https://tutshare.s3.us-west-2.amazonaws.com/category/37af4ebd-7223-49c6-b7df-56f5f002dd9d',
  //   key: 'category/37af4ebd-7223-49c6-b7df-56f5f002dd9d'}
};

// Delete a s3 object by given key
exports.s3DeleteImage = async (key) => {
  const s3DeleteParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
  };

  return s3.deleteObject(s3DeleteParams).promise();
};
