import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ForumComment } from '../../types';

interface CommentsState {
	comments: ForumComment[];
}

const initialState: CommentsState = {
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
});

export const { setComments } = commentsSlice.actions;

export const selectCurrPostComments: (state: RootState) => ForumComment[] = (
	state,
) => {
	const postComments = state.comments.comments.filter(
		(c) => c.postId === state.posts.currPost?.postId,
	);
	const rootComments: Map<number, ForumComment> = new Map(
		postComments.map((c) => [c.commentId, { ...c }]),
	);
	for (let comment of postComments) {
		if (comment.parentCommentId) {
			const parent = rootComments.get(comment.parentCommentId);
			if (parent) {
				parent.subComments = parent.subComments ?? [];
				parent.subComments.push(comment);
			}
		}
	}
	return Array.from(rootComments.values()).filter((c) => !c.parentCommentId);
};

export default commentsSlice.reducer;
