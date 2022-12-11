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
	commentId: number;
	postId: number;
	content: string;
	upVoteCount: number;
	downVoteCount: number;
	parentCommentId?: number;
	subComments?: ForumComment[];
	createdAt: string;
	createdBy?: User;
};
