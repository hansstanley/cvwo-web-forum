import { User } from './user';

export type ForumPost = {
	postId: number;
	title: string;
	description: string;
	createdAt: string;
	createdBy?: User;
};
