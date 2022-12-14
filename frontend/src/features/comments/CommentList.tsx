import { Divider, List, ListItem, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { ForumComment } from '../../types';
import CommentStrip from './CommentStrip';

export interface CommentListProps {
	comments: ForumComment[];
	canReply?: boolean;
}

export default function CommentList({
	comments,
	canReply = false,
}: CommentListProps) {
	return comments.length > 0 ? (
		<List>
			{comments.map((c) => (
				<CommentStrip comment={c} canReply={canReply} />
			))}
		</List>
	) : (
		<Divider>
			<Typography variant="caption">
				You've reached the end of this thread!
			</Typography>
		</Divider>
	);
}
