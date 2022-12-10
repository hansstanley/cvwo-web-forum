import { User } from './user';

export type ForumPost = {
	postId: number;
	title: string;
	description: string;
	tags?: string[];
	createdAt: string;
	createdBy?: User;
};

export type ForumComment = {
	content: string;
	upVoteCount: number;
	downVoteCount: number;
	subComments?: ForumComment[];
	createdAt: string;
	createdBy?: User;
};
