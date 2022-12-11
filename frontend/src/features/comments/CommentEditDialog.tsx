import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { ForumComment } from '../../types';
import { deleteComment, updateComment } from './commentsApi';
import { setComments } from './commentsSlice';

export interface CommentEditDialogProps {
	open: boolean;
	onClose: () => void;
	comment: ForumComment;
}

export default function CommentEditDialog({
	open,
	onClose,
	comment,
}: CommentEditDialogProps) {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const [content, setContent] = useState(comment.content);

	const handleClose = () => {
		onClose();
	};

	const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
		setContent(event.target.value);
	};

	const handleCommentUpdate = async () => {
		setLoading(true);
		try {
			const newComment: ForumComment = { ...comment };
			newComment.content = content;
			const comments = await updateComment(newComment);
			dispatch(setComments(comments));
			handleClose();
		} catch (e) {
		} finally {
			setLoading(false);
		}
	};

	const handleCommentDelete = async () => {
		setLoading(true);
		try {
			const comments = await deleteComment(comment);
			dispatch(setComments(comments));
			handleClose();
		} catch (e) {
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Edit comment</DialogTitle>
			<DialogContent>
				<TextField
					label="Write a comment..."
					margin="dense"
					fullWidth
					multiline
					maxRows={4}
					value={content}
					onChange={handleContentChange}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<LoadingButton
					loading={loading}
					variant="outlined"
					color="error"
					onClick={handleCommentDelete}>
					Delete
				</LoadingButton>
				<LoadingButton
					loading={loading}
					variant="contained"
					onClick={handleCommentUpdate}>
					Edit
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}
