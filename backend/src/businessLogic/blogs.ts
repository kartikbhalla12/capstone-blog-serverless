import { BlogItem } from '@models/blogItem';
import { BlogAccess } from '@dataLayer/blogAccess';
import * as uuid from 'uuid';
import BlogStorage from '@dataLayer/blogStorage';
import BlogShort from './../models/blogShort';

const blogAccess = new BlogAccess();
const blogStorage = new BlogStorage();

interface createBlogResponse {
	blogItem: BlogItem;
	blogImageUploadUrl: string;
}

export async function getBlogs(userId: string): Promise<BlogShort[]> {
	return blogAccess.getBlogs(userId);
}

export async function getUserBlogs(userId: string): Promise<BlogShort[]> {
	return blogAccess.getUserBlogs(userId);
}

export async function getBlog(
	userId: string,
	blogId: string
): Promise<BlogItem> {
	return blogAccess.getBlog(userId, blogId);
}
export async function getUserBlog(
	userId: string,
	blogId: string
): Promise<BlogItem> {
	return blogAccess.getUserBlog(userId, blogId);
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
export async function getUpdateImageUrl(blogId: string, userId: string) {
	const blog = blogAccess.getUserBlog(userId, blogId);

	if (!blog) throw new Error('Can not generate update url!');
	return await blogStorage.getAttachmentUploadUrl(blogId);
}
