import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { FilterTerm, ForumPost, SortTerm } from '../../types/post';
import { FetchStatus } from '../../types/common';
import { createPost, deletePost, fetchPosts, updatePost } from './postApi';
import { selectUser } from '../user/userSlice';

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
	filterTerm: FilterTerm;
}

const initialState: PostsState = {
	fetchAllStatus: { status: 'idle' },
	createStatus: { status: 'idle' },
	updateStatus: { status: 'idle' },
	deleteStatus: { status: 'idle' },
	posts: [],
	searchTags: [],
	sortTerm: { term: 'timestamp', ascending: false },
	filterTerm: 'all',
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
		setSortTerm: (state, action: PayloadAction<SortTerm>) => {
			state.sortTerm = action.payload;
		},
		setFilterTerm: (state, action: PayloadAction<FilterTerm>) => {
			state.filterTerm = action.payload;
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
	setSortTerm,
	setFilterTerm,
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

export const selectFilterTerm = (state: RootState) => state.posts.filterTerm;

export const selectSortTerm: (state: RootState) => SortTerm = (state) =>
	state.posts.sortTerm;

const selectSearchTags: (state: RootState) => string[] = (state) =>
	state.posts.searchTags.map((tag) => tag.trim().toLowerCase());

const selectSearchTerms: (state: RootState) => string[] = (state) =>
	state.posts.searchTerm
		?.trim()
		.split(' ')
		.map((term) => term.trim().toLowerCase())
		.filter((term) => !!term) ?? [];

export const selectPostsToShow = createSelector(
	[
		selectPosts,
		selectFilterTerm,
		selectSortTerm,
		selectSearchTags,
		selectSearchTerms,
		selectUser,
	],
	(posts, filterTerm, sortTerm, searchTags, searchTerms, user) =>
		posts
			.filter((p) => {
				switch (filterTerm) {
					case 'all':
						return true;
					case 'user':
						return p.user?.id === user?.id;
					default:
						return true;
				}
			})
			.filter((p) => stringHasTerms(p.tags ?? [], searchTags))
			.filter(
				(p) =>
					stringHasTerms(p.title, searchTerms) ||
					stringHasTerms(p.description, searchTerms) ||
					stringHasTerms(p.user?.username ?? '', searchTerms),
			)
			.sort((p1, p2) => {
				const order = sortTerm.ascending ? [p1, p2] : [p2, p1];
				switch (sortTerm.term) {
					case 'timestamp':
						return ('' + order[0].created_at).localeCompare(
							'' + order[1].created_at,
						);
					case 'title':
						return order[0].title.localeCompare(order[1].title);
					case 'user':
						return ('' + order[0].user?.username).localeCompare(
							'' + order[1].user?.username,
						);
					default:
						return (order[0].id ?? 0) - (order[1].id ?? 0);
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
