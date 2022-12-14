import {
	Collapse,
	Divider,
	LinearProgress,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CommentAdder, CommentList } from '../comments';
import { fetchCommentsByPost } from '../comments/commentsApi';
import { selectCommentsSortedByTimestamp } from '../comments/commentsSlice';

export default function PostDetail() {
	const dispatch = useAppDispatch();
	const { currPost } = useAppSelector((state) => state.posts);
	const comments = useAppSelector(selectCommentsSortedByTimestamp);

	useEffect(() => {
		if (currPost) {
			dispatch(fetchCommentsByPost(currPost));
		}
	}, [dispatch, currPost]);

	const rootComments = useMemo(
		() => comments.filter((c) => !(c.parent_id ?? false)),
		[comments],
	);

	return (
		<Stack direction="column" spacing={2} p={2}>
			<Typography variant="subtitle1">Comments</Typography>
			<Divider orientation="horizontal" />
			{currPost ? null : (
				<Typography>Select a post to view comments.</Typography>
			)}
			<Collapse in={!!currPost}>
				<Stack direction="column" spacing={2}>
					<CommentAdder />
					{rootComments.length > 0 ? (
						<CommentList comments={rootComments} canReply />
					) : (
						<Typography variant="body2" fontStyle="italic">
							It's awfully quiet here...
						</Typography>
					)}
				</Stack>
			</Collapse>
		</Stack>
	);
}
