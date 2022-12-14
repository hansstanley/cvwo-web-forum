import {
	Box,
	Divider,
	Paper,
	Stack,
	Toolbar,
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
import { AppProps } from '../types/common';

export default function MainFrame() {
	const isMobile = useAppSelector(selectMobile);

	return (
		<Stack
			flex={1}
			direction="row"
			height="100vh"
			divider={<Divider orientation="vertical" flexItem />}>
			<FixedHeightFrame>
				<Stack direction="column" spacing={2}>
					<PostSearch />
					<PostAccordingList />
				</Stack>
			</FixedHeightFrame>
			{isMobile ? null : (
				<FixedHeightFrame>
					<Paper elevation={2} sx={{ flex: 1 }}>
						<PostDetail />
					</Paper>
				</FixedHeightFrame>
			)}
		</Stack>
	);
}

function FixedHeightFrame({ children }: AppProps) {
	return (
		<Box sx={{ flex: 1, height: '100%', overflow: 'auto', p: 2 }}>
			<Toolbar />
			{children}
		</Box>
	);
}
