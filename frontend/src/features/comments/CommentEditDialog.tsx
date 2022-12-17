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
import { ForumComment } from '../../types/post';
import { FetchStatus } from '../../types/common';
import { deleteComment, updateComment } from './commentsApi';

export interface CommentEditDialogProps {
	open: boolean;
	onClose: () => void;
	comment: ForumComment;
}

/**
 * Dialog component with a text field to edit comments.
 * @param param0 Props.
 * @returns Dialog.
 */
export default function CommentEditDialog({
	open,
	onClose,
	comment,
}: CommentEditDialogProps) {
	const dispatch = useAppDispatch();
	const [status, setStatus] = useState<FetchStatus>({ status: 'idle' });
	const [content, setContent] = useState(comment.content);

	const handleClose = () => {
		onClose();
	};

	const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
		setContent(event.target.value);
	};

	const handleCommentUpdate = async () => {
		setStatus({ status: 'loading' });
		try {
			const newComment: ForumComment = { ...comment };
			newComment.content = content;
			await dispatch(updateComment(newComment));
			setStatus({ status: 'success' });
			handleClose();
		} catch (err) {
			setStatus({ status: 'failure', errorMessage: `${err}` });
		}
	};

	const handleCommentDelete = async () => {
		setStatus({ status: 'loading' });
		try {
			await dispatch(deleteComment(comment));
			setStatus({ status: 'success' });
			handleClose();
		} catch (err) {
			setStatus({ status: 'failure', errorMessage: `${err}` });
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
					loading={status.status === 'loading'}
					variant="outlined"
					color="error"
					onClick={handleCommentDelete}>
					Delete
				</LoadingButton>
				<LoadingButton
					loading={status.status === 'loading'}
					variant="contained"
					onClick={handleCommentUpdate}>
					Edit
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}
