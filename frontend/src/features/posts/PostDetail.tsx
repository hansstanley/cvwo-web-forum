import { Divider, LinearProgress, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useAppSelector } from '../../app/hooks';
import { CommentAdder, CommentList } from '../comments';
import { selectCurrPostComments } from '../comments/commentsSlice';

export default function PostDetail() {
	const { currPost } = useAppSelector((state) => state.posts);
	const comments = useAppSelector(selectCurrPostComments);

	return (
		<Paper
			elevation={2}
			sx={{
				flex: 1,
				maxHeight: '80vh',
				overflow: 'auto',
				m: 2,
			}}>
			<Stack
				direction="column"
				spacing={2}
				p={2}
				divider={<Divider orientation="horizontal" flexItem />}>
				<Typography variant="subtitle1">Comments</Typography>
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
