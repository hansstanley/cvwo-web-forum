import { List, ListItem } from '@mui/material';
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
	return (
		<List>
			{comments?.map((c) => (
				<CommentStrip comment={c} canReply={canReply} />
			))}
		</List>
	);
}
