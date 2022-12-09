import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ForumPost } from '../../types';

interface PostsState {
	posts: ForumPost[];
	currPost?: ForumPost;
}

const initialState: PostsState = {
	posts: [
		{
			postId: 1,
			title: 'Panel 1',
			createdAt: '2022-01-01 00:00:00',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent efficitur felis ac facilisis hendrerit. In dolor quam, aliquam quis arcu quis, venenatis gravida neque. Suspendisse potenti.',
		},
		{
			postId: 2,
			title: 'Panel 2',
			createdAt: '2022-02-02 01:01:01',
			description:
				'Aliquam tristique ac sem et finibus. Etiam scelerisque nec ex sit amet hendrerit. Cras ac arcu diam. Donec lorem orci, maximus non lectus in, eleifend dapibus mi. Sed imperdiet mauris quis vulputate aliquam.',
		},
	],
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setCurrPostId: (state, action: PayloadAction<number>) => {
			if (action.payload === -1) {
				state.currPost = undefined;
			} else {
				state.currPost = state.posts.find((p) => p.postId === action.payload);
			}
		},
	},
});

export const { setCurrPostId } = postsSlice.actions;

export default postsSlice.reducer;
