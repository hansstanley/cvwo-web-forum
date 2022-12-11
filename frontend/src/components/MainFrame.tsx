import { Box, Divider, Paper } from '@mui/material';
import { Stack } from '@mui/system';
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
			<Paper sx={{ flex: 1, maxHeight: '80vh', overflow: 'auto', p: 2, m: 2 }}>
				<Stack direction="column" spacing={2}>
					<PostSearch />
					<PostAccordingList />
				</Stack>
			</Paper>
			<PostDetail />
		</Stack>
	);
}
