import * as AWS from 'aws-sdk';

export default class BlogStorage {
	constructor(
		private readonly blogStorage = process.env.BLOGS_IMAGE_BUCKET,
		private readonly s3 = new AWS.S3({ signatureVersion: 'v4' })
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
