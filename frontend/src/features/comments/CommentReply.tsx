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
import { ForumComment } from '../../types';
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
	const [loading, setLoading] = useState(false);
	const [reply, setReply] = useState('');

	const handleClose = () => {
		setReply('');
		onClose();
	};

	const handleReplyChange = (event: ChangeEvent<HTMLInputElement>) => {
		setReply(event.target.value);
	};

	const handleCommentReply = async () => {
		setLoading(true);
		try {
			const newComment: ForumComment = {
				commentId: -1,
				postId: comment.postId,
				content: reply,
				upVoteCount: 0,
				downVoteCount: 0,
				parentCommentId: comment.commentId,
				createdAt: new Date().toISOString(),
				createdBy: userInfo,
			};
			const comments = await createComment(newComment);
			dispatch(setComments(comments));
			handleClose();
		} catch (e) {
		} finally {
			setLoading(false);
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
					loading={loading}
					variant="contained"
					disabled={reply.length === 0}
					onClick={handleCommentReply}>
					Reply
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}
