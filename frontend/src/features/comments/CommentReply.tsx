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
import { ForumComment } from '../../types';
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
	const [reply, setReply] = useState<string>('');

	const handleReplyChange = (event: ChangeEvent<HTMLInputElement>) => {
		setReply(event.target.value);
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Replying to</DialogTitle>
			<DialogContent>
				<Stack direction="column" spacing={2}>
					<CommentStrip comment={comment} canReply={false} />
					<TextField
						label="Write something..."
						multiline
						maxRows={4}
						onChange={handleReplyChange}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button variant="contained" disabled={reply.length === 0}>
					Post reply
				</Button>
			</DialogActions>
		</Dialog>
	);
}
