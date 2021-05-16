import { BlogItem } from '@models/blogItem';
import { BlogAccess } from '@dataLayer/blogAccess';
import * as uuid from 'uuid';
import BlogStorage from '@dataLayer/blogStorage';

const blogAccess = new BlogAccess();
const blogStorage = new BlogStorage();

interface createBlogResponse {
	blogItem: BlogItem;
	blogImageUploadUrl: string;
}

export async function getBlogs(userId: string): Promise<BlogItem[]> {
	return blogAccess.getBlogs(userId);
}

export async function getUserBlogs(userId: string): Promise<BlogItem[]> {
	return blogAccess.getUserBlogs(userId);
}

export async function createBlog(
	blogRequest: BlogRequest,
	userId: string
): Promise<createBlogResponse> {
	const blogId = uuid.v4();
	const bucketName = blogStorage.getBucketName();
	const currTime = new Date().toISOString();

	const blogImageUploadUrl = await blogStorage.getAttachmentUploadUrl(blogId);

	const blogItem: BlogItem = {
		blogId,
		userId,
		createdAt: currTime,
		updatedAt: currTime,
		imageUrl: `https://${bucketName}.s3.amazonaws.com/${blogId}`,
		...blogRequest,
	};
	await blogAccess.createBlog(blogItem);

	return { blogItem, blogImageUploadUrl };
}

export async function updateUserBlog(
	userId: string,
	blogId: string,
	blogRequest: BlogRequest
): Promise<BlogItem> {
	return blogAccess.updateUserBlog(userId, blogId, blogRequest);
}

export async function deleteUserBlog(
	blogId: string,
	userId: string
): Promise<BlogItem> {
	return blogAccess.deleteUserBlog(blogId, userId);
}
