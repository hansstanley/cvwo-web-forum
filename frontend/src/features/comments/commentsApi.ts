import { ForumComment } from '../../types';

let comments: ForumComment[] = [];

export async function createComment(comment: ForumComment) {
	comment.commentId = comments.length + 1;
	comments = [comment].concat(comments);
	await new Promise<void>((resolve, reject) => setTimeout(resolve, 1000));
	return comments;
}

export async function updateComment(comment: ForumComment) {
	comments = comments.map((c) =>
		c.commentId === comment.commentId ? comment : c,
	);
	await new Promise<void>((resolve, reject) => setTimeout(resolve, 1000));
	return comments;
}

export async function deleteComment(comment: ForumComment) {
	comments = comments.filter((c) => c.commentId !== comment.commentId);
	await new Promise<void>((resolve, reject) => setTimeout(resolve, 1000));
	return comments;
}
