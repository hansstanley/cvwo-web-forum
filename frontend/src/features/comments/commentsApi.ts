import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_COMMENTS, BASE_POSTS, BASE_USERS } from '../../app/constants';
import { RootState } from '../../app/store';
import { ForumComment, ForumPost } from '../../types/post';
import { selectClient } from '../api/apiSlice';

/**
 * Thunk to fetch comments belonging to a given ForumPost.
 */
export const fetchCommentsByPost = createAsyncThunk(
	'comments/all/post',
	async (post: ForumPost, { getState }) => {
		if (post.id === undefined) {
			throw new Error('Post id is needed to retrieve comments.');
		}
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.get<ForumComment[]>(
				`${BASE_POSTS}/${post.id}/${BASE_COMMENTS}`,
			);
			return response.data;
		} catch (err) {
			// TODO: handle fetch comments errors
			throw err;
		}
	},
);

/**
 * Thunk to fetch children comments of a given ForumComment.
 */
export const fetchCommentsByComment = createAsyncThunk(
	'comments/all/comment',
	async (comment: ForumComment, { getState }) => {
		if (comment.id === undefined) {
			throw new Error('Comment id is needed to retrieve comments.');
		}
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.get<ForumComment[]>(
				`${BASE_COMMENTS}/${comment.id}/${BASE_COMMENTS}`,
			);
			return response.data;
		} catch (err) {
			// TODO: handle fetch comments errors
			throw err;
		}
	},
);

export const createComment = createAsyncThunk(
	'comments/create',
	async (comment: ForumComment, { getState }) => {
		if (!comment.user) {
			throw new Error('User is needed for comment creation.');
		}
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.post<ForumComment>(
				`${BASE_USERS}/${comment.user.id}/${BASE_COMMENTS}`,
				comment,
			);
			return response.data;
		} catch (err) {
			// TODO: handle create comment errors
			throw err;
		}
	},
);

export const updateComment = createAsyncThunk(
	'comments/update',
	async (comment: ForumComment, { getState }) => {
		if (comment.id === undefined) {
			throw new Error('Comment id is needed for update.');
		}
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.patch<ForumComment>(
				`${BASE_COMMENTS}/${comment.id}`,
				comment,
			);
			return response.data;
		} catch (err) {
			// TODO: handle create comment errors
			throw err;
		}
	},
);

export const deleteComment = createAsyncThunk(
	'comments/delete',
	async (comment: ForumComment, { getState }) => {
		if (comment.id === undefined) {
			throw new Error('Comment id is needed for deletion.');
		}
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.delete<ForumComment>(
				`${BASE_COMMENTS}/${comment.id}`,
			);
			return response.data;
		} catch (err) {
			// TODO: handle create comment errors
			throw err;
		}
	},
);
