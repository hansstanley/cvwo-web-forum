import { Box, Chip, Divider, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PostAccordion from './PostAccordion';
import { fetchPosts } from './postApi';
import { selectFilteredPosts } from './postsSlice';

export default function PostAccordingList() {
	const dispatch = useAppDispatch();
	const { status, errorMessage } = useAppSelector(
		(state) => state.posts.fetchAllStatus,
	);
	const filteredPosts = useAppSelector(selectFilteredPosts);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchPosts());
		}
	}, [dispatch, status]);

	return (
		<Box sx={{ flex: 1 }}>
			{filteredPosts.length > 0 ? (
				filteredPosts.map((post) => <PostAccordion post={post} />)
			) : (
				<Divider>
					<Chip label="No posts to show" />
				</Divider>
			)}
		</Box>
	);
}
