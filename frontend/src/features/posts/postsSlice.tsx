import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ForumPost } from '../../types';

interface PostsState {
	posts: ForumPost[];
	currPost?: ForumPost;
	searchTags: string[];
	searchTerm?: string;
}

const initialState: PostsState = {
	posts: [
		{
			postId: 1,
			title:
				'Post 1 that is unnecessarily long: Lorem ipsum dolor sit amet, consectetur adipiscing.',
			createdAt: '2022-01-01 00:00:00',
			tags: ['Hello', 'World'],
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent efficitur felis ac facilisis hendrerit. In dolor quam, aliquam quis arcu quis, venenatis gravida neque. Suspendisse potenti.',
		},
		{
			postId: 2,
			title: 'Post 2',
			createdAt: '2022-02-02 01:01:01',
			description:
				'Aliquam tristique ac sem et finibus. Etiam scelerisque nec ex sit amet hendrerit. Cras ac arcu diam. Donec lorem orci, maximus non lectus in, eleifend dapibus mi. Sed imperdiet mauris quis vulputate aliquam.',
		},
		{
			postId: 2,
			title: 'Post 2',
			createdAt: '2022-02-02 01:01:01',
			description:
				'Aliquam tristique ac sem et finibus. Etiam scelerisque nec ex sit amet hendrerit. Cras ac arcu diam. Donec lorem orci, maximus non lectus in, eleifend dapibus mi. Sed imperdiet mauris quis vulputate aliquam.',
		},
		{
			postId: 3,
			title: 'Post 2',
			createdAt: '2022-02-02 01:01:01',
			description:
				'Aliquam tristique ac sem et finibus. Etiam scelerisque nec ex sit amet hendrerit. Cras ac arcu diam. Donec lorem orci, maximus non lectus in, eleifend dapibus mi. Sed imperdiet mauris quis vulputate aliquam.',
		},
		{
			postId: 4,
			title: 'Post 2',
			tags: ['Hello', 'Chickens'],
			createdAt: '2022-02-02 01:01:01',
			description:
				'Aliquam tristique ac sem et finibus. Etiam scelerisque nec ex sit amet hendrerit. Cras ac arcu diam. Donec lorem orci, maximus non lectus in, eleifend dapibus mi. Sed imperdiet mauris quis vulputate aliquam.',
		},
		{
			postId: 5,
			title: 'Post 2',
			createdAt: '2022-02-02 01:01:01',
			description:
				'Aliquam tristique ac sem et finibus. Etiam scelerisque nec ex sit amet hendrerit. Cras ac arcu diam. Donec lorem orci, maximus non lectus in, eleifend dapibus mi. Sed imperdiet mauris quis vulputate aliquam.',
		},
		{
			postId: 6,
			title: 'Post 2',
			createdAt: '2022-02-02 01:01:01',
			description:
				'Aliquam tristique ac sem et finibus. Etiam scelerisque nec ex sit amet hendrerit. Cras ac arcu diam. Donec lorem orci, maximus non lectus in, eleifend dapibus mi. Sed imperdiet mauris quis vulputate aliquam.',
		},
	],
	searchTags: [],
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
		addSearchTag: (state, action: PayloadAction<string>) => {
			if (!state.searchTags.includes(action.payload)) {
				state.searchTags = state.searchTags.concat([action.payload]);
			}
		},
		dropSearchTag: (state, action: PayloadAction<string>) => {
			state.searchTags = state.searchTags.filter(
				(tag) => tag !== action.payload,
			);
		},
		setSearchTerm: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload;
		},
	},
});

export const { setCurrPostId, addSearchTag, dropSearchTag, setSearchTerm } =
	postsSlice.actions;

export const selectPostsTags: (state: RootState) => string[] = (state) => {
	const tags = new Set<string>();
	for (let post of state.posts.posts) {
		for (let tag of post.tags ?? []) {
			tags.add(tag);
		}
	}
	return Array.from(tags);
};

export const selectFilteredPosts: (state: RootState) => ForumPost[] = (
	state,
) => {
	const terms =
		state.posts.searchTerm
			?.trim()
			.split(' ')
			.map((t) => t.trim())
			.filter((t) => !!t)
			.map((t) => t.toLowerCase()) ?? [];
	const filterString = (s: string) =>
		terms.reduce((prev, curr) => prev || s.includes(curr), false);
	return state.posts.posts.filter(
		(post) => filterString(post.title) || filterString(post.description),
	);
};

export default postsSlice.reducer;
