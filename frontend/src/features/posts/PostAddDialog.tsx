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
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ForumPost } from '../../types/post';
import { FetchStatus } from '../../types/common';
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
	const [status, setStatus] = useState<FetchStatus>({ status: 'idle' });
	const [title, setTitle] = useState<string>(postToEdit?.title ?? '');
	const [description, setDescription] = useState<string>(
		postToEdit?.description ?? '',
	);
	const [activeTags, setActiveTags] = useState<string[]>(
		postToEdit?.tags ?? [],
	);
	const [newTag, setNewTag] = useState<string>('');

	const inactiveTags = useMemo(
		() => postsTags.filter((tag) => !activeTags.includes(tag)),
		[postsTags, activeTags],
	);

	const handleClose = () => {
		onClose();
		setTitle(postToEdit?.title ?? '');
		setDescription(postToEdit?.description ?? '');
		setActiveTags(postToEdit?.tags ?? []);
	};

	const handlePost = async () => {
		setStatus({ status: 'loading' });

		const newPost: ForumPost = {
			title,
			description,
			tags: activeTags,
		};

		try {
			if (isEdit) {
				newPost.id = postToEdit?.id;
				await dispatch(updatePost(newPost));
			} else {
				newPost.user = userInfo;
				await dispatch(createPost(newPost));
			}
			setStatus({ status: 'success' });
			handleClose();
		} catch (err) {
			// TODO: handle create/update error
			setStatus({ status: 'failure', errorMessage: `${err}` });
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

	const handleTagAdd = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
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
					<Stack
						component="form"
						direction="column"
						spacing={1}
						onSubmit={handleTagAdd}>
						<Typography>Choose tags (optional):</Typography>
						<TextField
							fullWidth
							label="Create a new tag"
							value={newTag}
							margin="dense"
							onChange={handleNewTagChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Zoom in={!!newTag}>
											<IconButton type="submit">
												<Add />
											</IconButton>
										</Zoom>
									</InputAdornment>
								),
							}}
						/>
						<Stack direction="row" flexWrap="wrap">
							{activeTags.map((tag, index) => (
								<Chip
									key={index}
									label={tag}
									variant="outlined"
									onDelete={handleTagDelete(tag)}
									sx={{ mb: 1, mr: 1 }}
								/>
							))}
						</Stack>
						<Typography>Available tags:</Typography>
						<Stack direction="row" spacing={1}>
							{inactiveTags.length > 0 ? (
								inactiveTags.map((tag, index) => (
									<Chip key={index} label={tag} onClick={handleTagClick(tag)} />
								))
							) : (
								<Typography variant="body2" fontStyle="italic">
									No more tags, create one above
								</Typography>
							)}
						</Stack>
					</Stack>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<LoadingButton
					loading={status.status === 'loading'}
					onClick={handlePost}
					variant="contained">
					{isEdit ? 'Edit' : 'Post'}
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}
