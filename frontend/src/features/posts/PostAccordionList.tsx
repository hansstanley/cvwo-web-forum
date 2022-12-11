import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import PostAccordion from './PostAccordion';
import { selectFilteredPosts } from './postsSlice';

export default function PostAccordingList() {
	const filteredPosts = useAppSelector(selectFilteredPosts);

	return (
		<Box sx={{ flex: 1 }}>
			{filteredPosts.length > 0 ? (
				filteredPosts.map((post) => <PostAccordion post={post} />)
			) : (
				<Typography>No posts to show.</Typography>
			)}
		</Box>
	);
}
