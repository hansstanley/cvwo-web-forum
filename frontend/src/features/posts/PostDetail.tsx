import {
	Collapse,
	Divider,
	LinearProgress,
	Paper,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
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
				<CommentAdder />
				<CommentList comments={rootComments} canReply />
			</Collapse>
		</Stack>
	);
}
