import { createSlice } from '@reduxjs/toolkit';
import { ForumComment } from '../../types';

interface CommentsState {
	comments: ForumComment[];
}

const initialState: CommentsState = {
	comments: [
		{
			content:
				'First comment that is really really really really really really really really really really long',
			upVoteCount: 10,
			downVoteCount: 1,
			createdAt: '2022-01-01 01:01:01',
			subComments: [
				{
					content: 'Third comment!',
					upVoteCount: 15,
					downVoteCount: 3,
					createdAt: '2022-01-01 01:01:01',
					subComments: [
						{
							content: 'Third comment!',
							upVoteCount: 15,
							downVoteCount: 3,
							createdAt: '2022-01-01 01:01:01',
						},
						{
							content: 'Third comment!',
							upVoteCount: 15,
							downVoteCount: 3,
							createdAt: '2022-01-01 01:01:01',
						},
						{
							content: 'Third comment!',
							upVoteCount: 15,
							downVoteCount: 3,
							createdAt: '2022-01-01 01:01:01',
						},
						{
							content: 'Third comment!',
							upVoteCount: 15,
							downVoteCount: 3,
							createdAt: '2022-01-01 01:01:01',
						},
						{
							content: 'Third comment!',
							upVoteCount: 15,
							downVoteCount: 3,
							createdAt: '2022-01-01 01:01:01',
						},
						{
							content: 'Third comment!',
							upVoteCount: 15,
							downVoteCount: 3,
							createdAt: '2022-01-01 01:01:01',
						},
					],
				},
				{
					content: 'Third comment!',
					upVoteCount: 15,
					downVoteCount: 3,
					createdAt: '2022-01-01 01:01:01',
				},
				{
					content: 'Third comment!',
					upVoteCount: 15,
					downVoteCount: 3,
					createdAt: '2022-01-01 01:01:01',
				},
				{
					content: 'Third comment!',
					upVoteCount: 15,
					downVoteCount: 3,
					createdAt: '2022-01-01 01:01:01',
				},
				{
					content: 'Third comment!',
					upVoteCount: 15,
					downVoteCount: 3,
					createdAt: '2022-01-01 01:01:01',
				},
				{
					content: 'Third comment!',
					upVoteCount: 15,
					downVoteCount: 3,
					createdAt: '2022-01-01 01:01:01',
				},
			],
		},
		{
			content: 'Second comment!',
			upVoteCount: 5,
			downVoteCount: 2,
			createdAt: '2022-01-01 01:01:01',
		},
		{
			content: 'Third comment!',
			upVoteCount: 15,
			downVoteCount: 3,
			createdAt: '2022-01-01 01:01:01',
		},
		{
			content: 'Third comment!',
			upVoteCount: 15,
			downVoteCount: 3,
			createdAt: '2022-01-01 01:01:01',
		},
		{
			content: 'Third comment!',
			upVoteCount: 15,
			downVoteCount: 3,
			createdAt: '2022-01-01 01:01:01',
		},
	],
};

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
});

export default commentsSlice.reducer;
