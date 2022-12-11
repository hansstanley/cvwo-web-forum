import {
	Box,
	Divider,
	Paper,
	Stack,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { useAppSelector } from '../app/hooks';
import {
	PostAccordingList,
	PostAccordion,
	PostDetail,
} from '../features/posts';

import PostSearch from '../features/posts/PostSearch';
import { selectMobile } from '../features/theme/themeSlice';

export default function MainFrame() {
	const isMobile = useAppSelector(selectMobile);

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
			{isMobile ? null : (
				<Paper
					elevation={2}
					sx={{
						flex: 1,
						maxHeight: '80vh',
						overflow: 'auto',
						m: 2,
					}}>
					<PostDetail />
				</Paper>
			)}
		</Stack>
	);
}
