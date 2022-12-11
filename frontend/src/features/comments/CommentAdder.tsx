import { LoadingButton } from '@mui/lab';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ForumComment } from '../../types';
import { createComment } from './commentsApi';
import { setComments } from './commentsSlice';

export interface CommentAdderProps {
	parentComment?: ForumComment;
}

export default function CommentAdder({ parentComment }: CommentAdderProps) {
	const dispatch = useAppDispatch();
	const { currPost } = useAppSelector((state) => state.posts);
	const { userInfo } = useAppSelector((state) => state.user);
	const [loading, setLoading] = useState<boolean>(false);
	const [content, setContent] = useState<string>('');

	const handlePostClick = async () => {
		setLoading(true);
		const newComment: ForumComment = {
			commentId: -1,
			postId: currPost?.postId ?? -1,
			content,
			upVoteCount: 0,
			downVoteCount: 0,
			parentCommentId: parentComment?.commentId,
			createdAt: new Date().toISOString(),
			createdBy: userInfo,
		};
		try {
			const comments = await createComment(newComment);
			dispatch(setComments(comments));
			setContent('');
		} catch (e) {
		} finally {
			setLoading(false);
		}
	};

	const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
		setContent(event.target.value);
	};

	return (
		<Card>
			<CardContent>
				<Stack direction="column" spacing={1}>
					<TextField
						label="Write a comment..."
						multiline
						maxRows={4}
						disabled={loading}
						value={content}
						onChange={handleContentChange}
					/>
				</Stack>
			</CardContent>
			<CardActions>
				<LoadingButton loading={loading} onClick={handlePostClick}>
					Post comment
				</LoadingButton>
			</CardActions>
		</Card>
	);
}
