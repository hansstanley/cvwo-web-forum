import { Box, Collapse, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CommentAdder, CommentList } from '../comments';
import { fetchCommentsByPost } from '../comments/commentsApi';
import { selectCommentsSortedByTimestamp } from '../comments/commentsSlice';

/**
 * Container for CommentAdder and CommentList.
 * @returns Stack.
 */
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
		<Stack
			direction="column"
			spacing={2}
			p={2}
			divider={<Divider orientation="horizontal" />}>
			<Typography variant="subtitle1">Comments</Typography>
			<Box>
				<Collapse in={!currPost}>
					<Typography>Select a post to view comments.</Typography>
				</Collapse>
				<Collapse in={!!currPost}>
					<Stack direction="column" spacing={2}>
						<CommentAdder />
						<Box>
							<Collapse in={rootComments.length === 0}>
								<Typography variant="body2" fontStyle="italic">
									It's awfully quiet here...
								</Typography>
							</Collapse>
							<Collapse in={rootComments.length > 0}>
								<CommentList comments={rootComments} canReply />
							</Collapse>
						</Box>
					</Stack>
				</Collapse>
			</Box>
		</Stack>
	);
}
