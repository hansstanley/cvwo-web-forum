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

export interface ForumComment {
	id?: number;
	content: string;
	forum_post_id?: number;
	parent_id?: number;
	user?: User;
	forum_comments?: ForumComment[];
	created_at?: string;
	updated_at?: string;
	deleted?: boolean;
}
