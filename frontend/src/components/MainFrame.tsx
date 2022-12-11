import { Box, Divider, Paper, Stack } from '@mui/material';
import {
	PostAccordingList,
	PostAccordion,
	PostDetail,
} from '../features/posts';

import PostSearch from '../features/posts/PostSearch';

export default function MainFrame() {
	return (
		<Stack
			direction="row"
			divider={<Divider orientation="vertical" flexItem />}>
			<Box sx={{ flex: 1, maxHeight: '80vh', overflow: 'auto', p: 2 }}>
				<Stack direction="column" spacing={2}>
					<PostSearch />
					<PostAccordingList />
				</Stack>
			</Box>
			<PostDetail />
		</Stack>
	);
}
