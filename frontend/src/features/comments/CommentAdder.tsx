import { LoadingButton } from '@mui/lab';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import { ChangeEvent, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ForumComment } from '../../types/post';
import { FetchStatus } from '../../types/common';
import { createComment } from './commentsApi';

export interface CommentAdderProps {
	parentComment?: ForumComment;
}

export default function CommentAdder({ parentComment }: CommentAdderProps) {
	const dispatch = useAppDispatch();
	const { currPost } = useAppSelector((state) => state.posts);
	const { status: userStatus, userInfo } = useAppSelector(
		(state) => state.user,
	);
	const [status, setStatus] = useState<FetchStatus>({ status: 'idle' });
	const [content, setContent] = useState<string>('');

	const disabled = useMemo(() => userStatus.status !== 'success', [userStatus]);

	const handlePostClick = async () => {
		setStatus({ status: 'loading' });
		const newComment: ForumComment = {
			content,
			forum_post_id: currPost?.id,
			parent_id: parentComment?.id,
			user: userInfo,
		};
		try {
			await dispatch(createComment(newComment));
			setStatus({ status: 'success' });
			setContent('');
		} catch (err) {
			setStatus({ status: 'failure', errorMessage: `${err}` });
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
						label={disabled ? 'Please login to comment' : 'Write a comment...'}
						multiline
						maxRows={4}
						disabled={disabled || status.status === 'loading'}
						value={content}
						onChange={handleContentChange}
					/>
				</Stack>
			</CardContent>
			<CardActions>
				<LoadingButton
					disabled={disabled}
					loading={status.status === 'loading'}
					onClick={handlePostClick}>
					Post comment
				</LoadingButton>
			</CardActions>
		</Card>
	);
}
