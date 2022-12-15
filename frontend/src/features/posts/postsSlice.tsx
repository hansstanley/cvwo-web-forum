import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ForumPost, SortTerm } from '../../types/post';
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
	sortTerm: SortTerm;
}

const initialState: PostsState = {
	fetchAllStatus: { status: 'idle' },
	createStatus: { status: 'idle' },
	updateStatus: { status: 'idle' },
	deleteStatus: { status: 'idle' },
	posts: [],
	searchTags: [],
	sortTerm: 'timestamp_reversed',
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

export const selectPosts: (state: RootState) => ForumPost[] = (state) =>
	state.posts.posts;

export const selectSortTerm: (state: RootState) => SortTerm = (state) =>
	state.posts.sortTerm;

export const selectSearchTags: (state: RootState) => string[] = (state) =>
	state.posts.searchTags.map((tag) => tag.trim().toLowerCase());

export const selectSearchTerms: (state: RootState) => string[] = (state) =>
	state.posts.searchTerm
		?.trim()
		.split(' ')
		.map((term) => term.trim().toLowerCase())
		.filter((term) => !!term) ?? [];

export const selectPostsToShow = createSelector(
	[selectPosts, selectSortTerm, selectSearchTags, selectSearchTerms],
	(posts, sortTerm, searchTags, searchTerms) =>
		posts
			.filter((p) => stringHasTerms(p.tags ?? [], searchTags))
			.filter(
				(p) =>
					stringHasTerms(p.title, searchTerms) ||
					stringHasTerms(p.description, searchTerms) ||
					stringHasTerms(p.user?.username ?? '', searchTerms),
			)
			.sort((p1, p2) => {
				switch (sortTerm) {
					case 'timestamp':
						return ('' + p1.created_at).localeCompare('' + p2.created_at);
					case 'timestamp_reversed':
						return ('' + p2.created_at).localeCompare('' + p1.created_at);
					case 'title':
						return p1.title.localeCompare(p2.title);
					case 'user':
						return ('' + p1.user?.username).localeCompare(
							'' + p2.user?.username,
						);
					default:
						return (p1.id ?? 0) - (p2.id ?? 0);
				}
			}),
);

export default postsSlice.reducer;

function stringHasTerms(s: string | string[], searchTerms: string[]) {
	if (searchTerms.length === 0) return true;
	if (typeof s === 'string') {
		s = s.toLowerCase();
	} else {
		s = s.map((str) => str.toLowerCase());
	}
	return searchTerms.reduce((prev, curr) => prev || s.includes(curr), false);
}
