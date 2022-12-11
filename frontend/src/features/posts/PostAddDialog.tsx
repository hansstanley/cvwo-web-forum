import { Add } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
	Button,
	Chip,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
	Zoom,
} from '@mui/material';
import { ChangeEvent, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ForumPost } from '../../types';
import { createPost, updatePost } from './postApi';
import { selectPostsTags, setPosts } from './postsSlice';

export interface PostAddDialogProps {
	open: boolean;
	onClose: () => void;
	postToEdit?: ForumPost;
}

export default function PostAddDialog({
	open,
	onClose,
	postToEdit,
}: PostAddDialogProps) {
	const dispatch = useAppDispatch();
	const { userInfo } = useAppSelector((state) => state.user);
	const postsTags = useAppSelector(selectPostsTags);
	const isEdit = useMemo(() => !!postToEdit, [postToEdit]);
	const [loading, setLoading] = useState<boolean>(false);
	const [title, setTitle] = useState<string>(postToEdit?.title ?? '');
	const [description, setDescription] = useState<string>(
		postToEdit?.description ?? '',
	);
	const [activeTags, setActiveTags] = useState<string[]>(
		postToEdit?.tags ?? [],
	);
	const [newTag, setNewTag] = useState<string>('');

	const handleClose = () => {
		onClose();
		setTitle(postToEdit?.title ?? '');
		setDescription(postToEdit?.description ?? '');
		setActiveTags(postToEdit?.tags ?? []);
	};

	const handlePost = async () => {
		setLoading(true);
		const newPost: ForumPost = {
			postId: postToEdit?.postId ?? -1, // ignored
			title,
			description,
			tags: activeTags,
			createdAt: new Date().toISOString(),
			createdBy: userInfo,
		};

		try {
			const posts = isEdit
				? await updatePost(newPost)
				: await createPost(newPost);
			dispatch(setPosts(posts));
			handleClose();
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		setDescription(event.target.value);
	};

	const handleTagClick = (tag: string) => () => {
		setActiveTags(activeTags.concat([tag]));
	};

	const handleTagDelete = (tag: string) => () => {
		setActiveTags(activeTags.filter((t) => t !== tag));
	};

	const handleTagAdd = () => {
		handleTagClick(newTag)();
		setNewTag('');
	};

	const handleNewTagChange = (event: ChangeEvent<HTMLInputElement>) => {
		setNewTag(event.target.value);
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>{isEdit ? 'Edit' : 'Create'} post</DialogTitle>
			<DialogContent>
				<Stack direction="column" spacing={1}>
					<TextField
						margin="dense"
						fullWidth
						required
						label="Title"
						value={title}
						onChange={handleTitleChange}
					/>
					<TextField
						margin="dense"
						fullWidth
						required
						multiline
						rows={4}
						label="Description"
						value={description}
						onChange={handleDescriptionChange}
					/>
					<Divider orientation="horizontal" flexItem />
					<Typography>Choose tags (optional):</Typography>
					<TextField
						fullWidth
						placeholder="Add tags..."
						value={newTag}
						onChange={handleNewTagChange}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Stack direction="row" spacing={1}>
										{activeTags.map((tag) => (
											<Chip
												label={tag}
												variant="outlined"
												onDelete={handleTagDelete(tag)}
											/>
										))}
									</Stack>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<Zoom in={!!newTag}>
										<IconButton onClick={handleTagAdd}>
											<Add />
										</IconButton>
									</Zoom>
								</InputAdornment>
							),
						}}
					/>
					<Stack direction="row" spacing={1}>
						{postsTags
							.filter((tag) => !activeTags.includes(tag))
							.map((tag) => (
								<Chip label={tag} onClick={handleTagClick(tag)} />
							))}
					</Stack>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<LoadingButton
					loading={loading}
					onClick={handlePost}
					variant="contained">
					{isEdit ? 'Edit' : 'Post'}
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}
