import {
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectPostsTags } from './postsSlice';

export interface PostAddDialogProps {
	open: boolean;
	onClose: () => void;
}

export default function PostAddDialog({ open, onClose }: PostAddDialogProps) {
	const postsTags = useAppSelector(selectPostsTags);
	const [content, setContent] = useState<string>('');
	const [activeTags, setActiveTags] = useState<string[]>([]);

	const handleClose = () => {
		onClose();
	};

	const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
		setContent(event.target.value);
	};

	const handleTagClick = (tag: string) => () => {
		setActiveTags(activeTags.concat([tag]));
	};

	const handleTagDelete = (tag: string) => () => {
		setActiveTags(activeTags.filter((t) => t !== tag));
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Have something to say?</DialogTitle>
			<DialogContent>
				<Stack direction="column" spacing={1}>
					<Typography>Create a new forum post:</Typography>
					<TextField
						fullWidth
						label="Write something..."
						multiline
						maxRows={4}
						onChange={handleContentChange}
					/>
					<Divider orientation="horizontal" flexItem />
					<Typography>Choose tags (optional):</Typography>
					<Stack direction="row" spacing={1}>
						{postsTags.map((tag) =>
							activeTags.includes(tag) ? (
								<Chip
									label={tag}
									variant="outlined"
									onDelete={handleTagDelete(tag)}
								/>
							) : (
								<Chip label={tag} onClick={handleTagClick(tag)} />
							),
						)}
					</Stack>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button variant="contained" disabled={content.length < 10}>
					Post
				</Button>
			</DialogActions>
		</Dialog>
	);
}
