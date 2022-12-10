import { Divider, LinearProgress, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useAppSelector } from '../../app/hooks';
import { CommentAdder, CommentList } from '../comments';

export default function PostDetail() {
	const { currPost } = useAppSelector((state) => state.posts);
	const { comments } = useAppSelector((state) => state.comments);

	return (
		<Paper
			elevation={2}
			sx={{
				flex: 1,
				maxHeight: '80vh',
				overflow: 'auto',
				m: 2,
			}}>
			<Stack direction="column" spacing={1} p={2}>
				<Typography variant="subtitle1">Comments</Typography>
				<LinearProgress
					variant="determinate"
					value={100}
					sx={{ borderRadius: 1 }}
				/>
				{currPost ? (
					<>
						<CommentAdder />
						<CommentList comments={comments} canReply />
					</>
				) : (
					<Typography>Select a post to view comments.</Typography>
				)}
			</Stack>
		</Paper>
	);
}
