import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ForumPost } from '../../types';
import { FetchStatus } from '../../types/common';
import { createPost, deletePost, fetchPosts, updatePost } from './postApi';

interface PostsState {
	fetchAllStatus: FetchStatus;
	createStatus: FetchStatus;
	updateStatus: FetchStatus;
	deleteStatus: FetchStatus;
	posts: ForumPost[];
	currPost?: ForumPost;
	searchTags: string[];
	searchTerm?: string;
}

const initialState: PostsState = {
	fetchAllStatus: { status: 'idle' },
	createStatus: { status: 'idle' },
	updateStatus: { status: 'idle' },
	deleteStatus: { status: 'idle' },
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
				state.currPost = state.posts.find((post) => post.id === action.payload);
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
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.fetchAllStatus = { status: 'loading', errorMessage: undefined };
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.fetchAllStatus = { status: 'success', errorMessage: undefined };
				state.posts = action.payload;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.fetchAllStatus = {
					status: 'failure',
					errorMessage: action.error.message,
				};
				state.posts = [];
			});
		builder
			.addCase(createPost.pending, (state, action) => {
				state.createStatus = { status: 'loading', errorMessage: undefined };
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.createStatus = { status: 'success', errorMessage: undefined };
				state.posts = state.posts.concat([action.payload]);
			})
			.addCase(createPost.rejected, (state, action) => {
				state.createStatus = {
					status: 'failure',
					errorMessage: action.error.message,
				};
			});
		builder
			.addCase(updatePost.pending, (state, action) => {
				state.updateStatus = { status: 'loading', errorMessage: undefined };
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				state.updateStatus = { status: 'success', errorMessage: undefined };
				state.posts = state.posts.map((post) =>
					post.id === action.payload.id ? action.payload : post,
				);
			})
			.addCase(updatePost.rejected, (state, action) => {
				state.updateStatus = {
					status: 'failure',
					errorMessage: action.error.message,
				};
			});
		builder
			.addCase(deletePost.pending, (state, action) => {
				state.deleteStatus = { status: 'loading', errorMessage: undefined };
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.deleteStatus = { status: 'success', errorMessage: undefined };
				state.posts = state.posts.filter(
					(post) => post.id !== action.payload.id,
				);
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.deleteStatus = {
					status: 'failure',
					errorMessage: action.error.message,
				};
			});
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
	const filterTag = (post: ForumPost) =>
		state.posts.searchTags.reduce(
			(prev, curr) => prev || (post.tags?.includes(curr) ?? false),
			false,
		);
	const fileredBySearch =
		terms.length === 0
			? state.posts.posts
			: state.posts.posts.filter(
					(post) =>
						filterString(post.title ?? '') ||
						filterString(post.description ?? '') ||
						filterString(post.user?.username ?? ''),
			  );
	const filteredByTags = fileredBySearch.filter(
		(post) => state.posts.searchTags.length === 0 || filterTag(post),
	);
	return filteredByTags;
};

export default postsSlice.reducer;
