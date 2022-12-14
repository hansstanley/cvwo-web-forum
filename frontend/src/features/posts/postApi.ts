import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '../../app/store';
import { ForumPost } from '../../types/post';
import { selectClient } from '../api/apiSlice';

const BASE_ROUTE = 'forum_posts';

export const fetchPosts = createAsyncThunk(
	'posts/all',
	async (_, { getState }) => {
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.get<ForumPost[]>(`${BASE_ROUTE}`);
			return response.data;
		} catch (err) {
			// TODO: handle fetch posts errors
			throw err;
		}
	},
);

export const createPost = createAsyncThunk(
	'posts/create',
	async (post: ForumPost, { getState }) => {
		if (!post.user) {
			throw new Error('User is needed for post creation.');
		}
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.post<ForumPost>(
				`users/${post.user.id}/${BASE_ROUTE}`,
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

export const updatePost = createAsyncThunk(
	'posts/update',
	async (post: ForumPost, { getState }) => {
		if (post.id === undefined) {
			throw new Error('Post id is needed for update.');
		}
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.patch<ForumPost>(
				`${BASE_ROUTE}/${post.id}`,
				post,
			);
			return response.data;
		} catch (err) {
			// TODO: handle post update errors
			throw err;
		}
	},
);

export const deletePost = createAsyncThunk(
	'posts/delete',
	async (post: ForumPost, { getState }) => {
		if (post.id === undefined) {
			throw new Error('Post id is need for deletion.');
		}
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.delete<ForumPost>(
				`${BASE_ROUTE}/${post.id}`,
			);
			return response.data;
		} catch (err) {
			// TODO: handle post delete errors
			throw err;
		}
	},
);
