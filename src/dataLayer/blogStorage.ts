import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';

const XAWS = AWSXRay.captureAWS(AWS);

export default class BlogStorage {
	constructor(
		private readonly blogStorage = process.env.BLOGS_IMAGE_BUCKET,
		private readonly s3 = new XAWS.S3({ signatureVersion: 'v4' })
	) {}

	getBucketName() {
		return this.blogStorage;
	}

	async getAttachmentUploadUrl(blogId: string): Promise<string> {
		return this.s3.getSignedUrl('putObject', {
			Bucket: this.blogStorage,
			Key: blogId,
			Expires: 3000,
		});
	}
}
