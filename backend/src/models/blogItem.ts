export interface BlogItem {
	blogId: string;
	userId: string;
	authorName: string;
	heading: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	imageUrl: string;
	content: Object;
	timeToRead: number;
}
