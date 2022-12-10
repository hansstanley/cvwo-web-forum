import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
} from '@mui/material';
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
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Replying to</DialogTitle>
			<DialogContent>
				<Stack direction="column" spacing={2}>
					<CommentStrip comment={comment} canReply={false} />
					<TextField label="Write something..." multiline maxRows={4} />
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button variant="contained">Post reply</Button>
			</DialogActions>
		</Dialog>
	);
}
