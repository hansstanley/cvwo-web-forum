import { Reply } from '@mui/icons-material';
import {
	Box,
	Collapse,
	colors,
	Divider,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { UpDownVoter } from '../../components';
import { ForumComment } from '../../types';
import CommentList from './CommentList';
import CommentReply from './CommentReply';

export interface CommentStripProps {
	comment: ForumComment;
	canReply?: boolean;
}

export default function CommentStrip({
	comment,
	canReply = false,
}: CommentStripProps) {
	const [subOpen, setSubOpen] = useState(false);
	const [replyOpen, setReplyOpen] = useState(false);

	const toggleSubOpen = () => {
		setSubOpen(!subOpen);
	};

	const toggleReplyOpen = (open: boolean) => () => {
		setReplyOpen(open);
	};

	const header = (
		<Stack direction="row" spacing={2} alignItems="flex-end" flex={1}>
			<Typography variant="body1" fontWeight="bold">
				{comment.createdBy?.username ?? 'Unknown'}
			</Typography>
			<Typography variant="caption">{comment.createdAt}</Typography>
		</Stack>
	);

	return (
		<ListItem disablePadding sx={{ flex: 1 }}>
			<Stack direction="row" flex={1} my={1} alignItems="flex-start">
				<Divider orientation="vertical" flexItem />
				<Stack direction="column" flex={1}>
					<ListItemButton onClick={toggleSubOpen} sx={{ borderRadius: 1 }}>
						<Stack direction="column" spacing={1}>
							{header}
							<Typography variant="body1">{comment.content}</Typography>
						</Stack>
					</ListItemButton>
					{comment.subComments ? (
						<Collapse in={subOpen} sx={{ ml: 2 }}>
							<CommentList comments={comment.subComments} canReply={canReply} />
						</Collapse>
					) : null}
				</Stack>
				{canReply ? (
					<IconButton size="small" onClick={toggleReplyOpen(true)}>
						<Reply fontSize="inherit" />
					</IconButton>
				) : null}
			</Stack>
			{canReply ? (
				<CommentReply
					open={replyOpen}
					onClose={toggleReplyOpen(false)}
					comment={comment}
				/>
			) : null}
		</ListItem>
	);
}
