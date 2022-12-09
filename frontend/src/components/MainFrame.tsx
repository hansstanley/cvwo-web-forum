import { Box, Divider } from '@mui/material';
import { Stack } from '@mui/system';
import PostAccordion from '../features/posts/PostAccordion';
import PostDetail from '../features/posts/PostDetail';
import PostSearch from './PostSearch';

export default function MainFrame() {
	return (
		<Stack
			direction="row"
			divider={<Divider orientation="vertical" flexItem />}
			spacing={2}>
			<Stack direction="column" spacing={2} sx={{ flex: 1 }}>
				<PostSearch />
				<PostAccordion />
			</Stack>
			<PostDetail />
		</Stack>
	);
}
