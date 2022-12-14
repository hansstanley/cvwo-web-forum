import { User } from './user';

export interface ForumPost {
	id?: number;
	title: string;
	description: string;
	tags?: string[];
	user?: User;
	forum_comments?: ForumComment[];
	updated_at?: string;
}

export type ForumComment = {
	id?: number;
	content: string;
	forum_post_id?: number;
	parent_id?: number;
	user?: User;
	forum_comments?: ForumComment[];
	updated_at?: string;
};
