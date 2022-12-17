import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { ForumPost } from '../../types/post';
import { FetchStatus } from '../../types/common';
import { deletePost } from './postApi';
import { setCurrPostId } from './postsSlice';

export interface PostDeleteDialogProps {
	open: boolean;
	onClose: () => void;
	post: ForumPost;
}

/**
 * Dialog componentt to request user confirmation.
 * @param param0 Props.
 * @returns Dialog.
 */
export default function PostDeleteDialog({
	open,
	onClose,
	post,
}: PostDeleteDialogProps) {
	const dispatch = useAppDispatch();
	const [status, setStatus] = useState<FetchStatus>({ status: 'idle' });

	const handlePostDelete = async () => {
		setStatus({ status: 'loading' });
		try {
			await dispatch(deletePost(post));
			dispatch(setCurrPostId(-1));
			setStatus({ status: 'success' });
			handleClose();
		} catch (err) {
			setStatus({ status: 'failure', errorMessage: `${err}` });
		}
	};

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>This action cannot be undone!</DialogTitle>
			<DialogContent>
				<DialogContentText>Are you sure to delete this post?</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<LoadingButton
					variant="contained"
					loading={status.status === 'loading'}
					onClick={handlePostDelete}>
					Delete
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}
