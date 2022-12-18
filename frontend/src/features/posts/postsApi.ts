import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { BASE_POSTS } from '../../app/constants';
import { RootState } from '../../app/store';
import { ForumPost } from '../../types/post';
import { selectClient } from '../api/apiSlice';

/**
 * Thunk to fetch all ForumPosts.
 */
export const fetchPosts = createAsyncThunk(
	'posts/all',
	async (_, { getState }) => {
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.get<ForumPost[]>(`${BASE_POSTS}`);
			return response.data;
		} catch (err) {
			// TODO: handle fetch posts errors
			throw err;
		}
	},
);

/**
 * Thunk to create a ForumPost.
 */
export const createPost = createAsyncThunk(
	'posts/create',
	async (post: ForumPost, { getState }) => {
		if (!post.user) {
			throw new Error('Please login to create posts.');
		}
		checkPost(post);
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.post<ForumPost>(
				`users/${post.user.id}/${BASE_POSTS}`,
				post,
			);
			return response.data;
		} catch (err) {
			if (err instanceof AxiosError) {
				switch (err.response?.status) {
					case 400:
						throw new Error(`Bad request when creating post.`);
					default:
						throw new Error(`An error occurred: ${err.message}`);
				}
			} else {
				throw err;
			}
		}
	},
);

/**
 * Thunk to update a ForumPost.
 */
export const updatePost = createAsyncThunk(
	'posts/update',
	async (post: ForumPost, { getState }) => {
		if (post.id === undefined) {
			throw new Error('Missing post ID.');
		}
		checkPost(post);
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.patch<ForumPost>(
				`${BASE_POSTS}/${post.id}`,
				post,
			);
			return response.data;
		} catch (err) {
			// TODO: handle post update errors
			throw err;
		}
	},
);

/**
 * Thunk to delete a ForumPost.
 */
export const deletePost = createAsyncThunk(
	'posts/delete',
	async (post: ForumPost, { getState }) => {
		if (post.id === undefined) {
			throw new Error('Missing post ID.');
		}
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.delete<ForumPost>(
				`${BASE_POSTS}/${post.id}`,
			);
			return response.data;
		} catch (err) {
			// TODO: handle post delete errors
			throw err;
		}
	},
);

function checkPost(post: ForumPost) {
	if (!post.title) throw new Error('Post needs a title!');
	if (!post.description) throw new Error('Post needs a description!');
}
