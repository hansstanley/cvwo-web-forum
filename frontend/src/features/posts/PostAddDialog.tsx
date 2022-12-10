import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { ChangeEvent, useState } from 'react';

export interface PostAddDialogProps {
	open: boolean;
	onClose: () => void;
}

export default function PostAddDialog({ open, onClose }: PostAddDialogProps) {
	const [content, setContent] = useState('');

	const handleClose = () => {
		onClose();
	};

	const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
		setContent(event.target.value);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Have something to say?</DialogTitle>
			<DialogContent>
				<Stack direction="column" spacing={2}>
					<Typography>Create a new forum post</Typography>
					<TextField
						fullWidth
						label="Write something..."
						multiline
						maxRows={4}
						onChange={handleContentChange}
					/>
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
