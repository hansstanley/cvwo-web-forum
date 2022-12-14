import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ForumComment } from '../../types/post';
import { FetchStatus } from '../../types/common';
import { createComment } from './commentsApi';
import { setComments } from './commentsSlice';
import CommentStrip from './CommentStrip';

export interface CommentReplyProps {
	open: boolean;
	comment: ForumComment;
	onClose: () => void;
}

export default function CommentReply({
	open,
	comment,
	onClose,
}: CommentReplyProps) {
	const dispatch = useAppDispatch();
	const { userInfo } = useAppSelector((state) => state.user);
	const { currPost } = useAppSelector((state) => state.posts);
	const [status, setStatus] = useState<FetchStatus>({ status: 'idle' });
	const [reply, setReply] = useState('');

	const handleClose = () => {
		setReply('');
		onClose();
	};

	const handleReplyChange = (event: ChangeEvent<HTMLInputElement>) => {
		setReply(event.target.value);
	};

	const handleCommentReply = async () => {
		setStatus({ status: 'loading' });
		try {
			const newComment: ForumComment = {
				content: reply,
				forum_post_id: currPost?.id,
				parent_id: comment.id,
				user: userInfo,
			};
			await dispatch(createComment(newComment));
			setStatus({ status: 'success' });
			handleClose();
		} catch (err) {
			setStatus({ status: 'failure', errorMessage: `${err}` });
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogContent>
				<Stack direction="column" spacing={2}>
					<CommentStrip comment={comment} canReply={false} />
					<TextField
						label="Write something..."
						multiline
						maxRows={4}
						value={reply}
						onChange={handleReplyChange}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<LoadingButton
					loading={status.status === 'loading'}
					variant="contained"
					disabled={reply.length === 0}
					onClick={handleCommentReply}>
					Reply
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}
