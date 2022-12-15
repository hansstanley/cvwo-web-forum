import { Divider, List, ListItem, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { ForumComment } from '../../types/post';
import CommentStrip from './CommentStrip';

export interface CommentListProps {
	comments: ForumComment[];
	canReply?: boolean;
	depth?: number;
}

export default function CommentList({
	comments,
	canReply = false,
	depth = 0,
}: CommentListProps) {
	return comments.length > 0 ? (
		<List>
			{comments.map((c) => (
				<CommentStrip
					key={c.id}
					comment={c}
					canReply={canReply}
					depth={depth}
				/>
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
