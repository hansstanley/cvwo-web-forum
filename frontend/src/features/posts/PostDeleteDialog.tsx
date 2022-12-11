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
import { ForumPost } from '../../types';
import { deletePost } from './postApi';
import { setCurrPostId, setPosts } from './postsSlice';

export interface PostDeleteDialogProps {
	open: boolean;
	onClose: () => void;
	post: ForumPost;
}

export default function PostDeleteDialog({
	open,
	onClose,
	post,
}: PostDeleteDialogProps) {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState<boolean>(false);

	const handlePostDelete = async () => {
		setLoading(true);
		try {
			const posts = await deletePost(post);
			dispatch(setPosts(posts));
			dispatch(setCurrPostId(-1));
		} catch (e) {
		} finally {
			setLoading(false);
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
					loading={loading}
					onClick={handlePostDelete}>
					Delete
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}
