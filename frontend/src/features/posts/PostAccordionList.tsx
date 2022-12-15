import { Box, Chip, Divider, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PostAccordion from './PostAccordion';
import { fetchPosts } from './postApi';
import { selectPostsToShow } from './postsSlice';

export default function PostAccordionList() {
	const dispatch = useAppDispatch();
	const { status, errorMessage } = useAppSelector(
		(state) => state.posts.fetchAllStatus,
	);
	const posts = useAppSelector(selectPostsToShow);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchPosts());
		}
	}, [dispatch, status]);

	return (
		<Box sx={{ flex: 1 }}>
			{posts.length > 0 ? (
				posts.map((post) => <PostAccordion key={post.id} post={post} />)
			) : (
				<Divider>
					<Chip label="No posts to show" />
				</Divider>
			)}
		</Box>
	);
}
