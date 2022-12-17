import { Divider, List, Typography } from '@mui/material';
import { ForumComment } from '../../types/post';
import CommentStrip from './CommentStrip';

export interface CommentListProps {
	comments: ForumComment[];
	canReply?: boolean;
	depth?: number;
}

/**
 * Recursive component to display CommentStrip components
 * in a list format.
 * @param param0 Props.
 * @returns List if comments exist,
 * 					Divider otherwise.
 */
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
