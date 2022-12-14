import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ForumComment } from '../../types';
import { FetchStatus } from '../../types/common';
import {
	createComment,
	deleteComment,
	fetchCommentsByPost,
	updateComment,
} from './commentsApi';

interface CommentsState {
	fetchStatus: FetchStatus;
	comments: ForumComment[];
}

const initialState: CommentsState = {
	fetchStatus: { status: 'idle' },
	comments: [],
};

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		setComments: (state, action: PayloadAction<ForumComment[]>) => {
			state.comments = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchCommentsByPost.pending, (state, action) => {
				state.fetchStatus = { status: 'loading' };
			})
			.addCase(fetchCommentsByPost.fulfilled, (state, action) => {
				state.fetchStatus = { status: 'success' };
				state.comments = action.payload;
			})
			.addCase(fetchCommentsByPost.rejected, (state, action) => {
				console.log(action.error);
				state.fetchStatus = {
					status: 'failure',
					errorMessage: action.error.message,
				};
			});
		builder
			.addCase(createComment.fulfilled, (state, action) => {
				state.comments.push(action.payload);
			})
			.addCase(updateComment.fulfilled, (state, action) => {
				state.comments = state.comments.map((c) =>
					c.id === action.payload.id ? action.payload : c,
				);
			})
			.addCase(deleteComment.fulfilled, (state, action) => {
				state.comments = state.comments.map((c) =>
					c.id === action.payload.id ? action.payload : c,
				);
			});
	},
});

export const { setComments } = commentsSlice.actions;

export const selectCommentsSortedByTimestamp: (
	state: RootState,
) => ForumComment[] = (state) => {
	const sorted = [...state.comments.comments];
	sorted.sort((c1, c2) =>
		('' + c2.created_at).localeCompare('' + c1.created_at),
	);
	return sorted;
};

export default commentsSlice.reducer;
