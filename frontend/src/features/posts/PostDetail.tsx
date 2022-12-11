import {
	Collapse,
	Divider,
	LinearProgress,
	Paper,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useAppSelector } from '../../app/hooks';
import { CommentAdder, CommentList } from '../comments';
import { selectCurrPostComments } from '../comments/commentsSlice';

export default function PostDetail() {
	const { currPost } = useAppSelector((state) => state.posts);
	const comments = useAppSelector(selectCurrPostComments);

	return (
		<Stack direction="column" spacing={2} p={2}>
			<Typography variant="subtitle1">Comments</Typography>
			<Divider orientation="horizontal" />
			{currPost ? null : (
				<Typography>Select a post to view comments.</Typography>
			)}
			<Collapse in={!!currPost}>
				<CommentAdder />
				<CommentList comments={comments} canReply />
			</Collapse>
		</Stack>
	);
}
