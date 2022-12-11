import { ForumPost } from '../../types';

let posts: ForumPost[] = [];

export async function createPost(post: ForumPost) {
	post.postId = posts.length + 1;
	posts = posts.concat([post]);
	await new Promise<void>((resolve, reject) => setTimeout(resolve, 1000));
	return posts;
}

export async function updatePost(post: ForumPost) {
	posts = posts.map((p) => (p.postId === post.postId ? post : p));
	await new Promise<void>((resolve, reject) => setTimeout(resolve, 1000));
	return posts;
}

export async function deletePost(post: ForumPost) {
	posts = posts.filter((p) => p.postId !== post.postId);
	await new Promise<void>((resolve, reject) => setTimeout(resolve, 1000));
	return posts;
}
