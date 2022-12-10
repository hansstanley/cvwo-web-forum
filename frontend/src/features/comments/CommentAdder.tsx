import {
	Button,
	Card,
	CardActions,
	CardContent,
	TextField,
} from '@mui/material';
import { Stack } from '@mui/system';

export default function CommentAdder() {
	return (
		<Card>
			<CardContent>
				<Stack direction="column" spacing={1}>
					<TextField label="Write a comment..." multiline maxRows={4} />
				</Stack>
			</CardContent>
			<CardActions>
				<Button>Post comment</Button>
			</CardActions>
		</Card>
	);
}
