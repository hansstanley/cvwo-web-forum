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
	posts: [],
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
		setPosts: (state, action: PayloadAction<ForumPost[]>) => {
			state.posts = action.payload;
		},
	},
});

export const {
	setCurrPostId,
	addSearchTag,
	dropSearchTag,
	setSearchTerm,
	setPosts,
} = postsSlice.actions;

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
		terms.reduce((prev, curr) => prev || s.toLowerCase().includes(curr), false);
	return terms.length === 0
		? state.posts.posts
		: state.posts.posts.filter(
				(post) =>
					filterString(post.title) ||
					filterString(post.description) ||
					filterString(post.createdBy?.username ?? ''),
		  );
};

export default postsSlice.reducer;
