import { Delete, Edit, MoreHoriz, MoreVert, Reply } from '@mui/icons-material';
import {
	Box,
	ButtonGroup,
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
import CommentEditDialog from './CommentEditDialog';
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
	const [editOpen, setEditOpen] = useState(false);

	const toggleSubOpen = () => {
		setSubOpen(!subOpen);
	};

	const toggleReplyOpen = (open: boolean) => () => {
		setReplyOpen(open);
	};

	const toggleEditOpen = (open: boolean) => () => {
		setEditOpen(open);
	};

	const header = (
		<Stack direction="row" spacing={2} alignItems="flex-end" flex={1}>
			<Typography variant="body1" fontWeight="bold">
				{comment.createdBy?.username ?? 'Unknown'}
			</Typography>
			<Typography variant="caption">{comment.createdAt}</Typography>
		</Stack>
	);

	const buttons = canReply ? (
		<Stack direction="column">
			<IconButton size="small" onClick={toggleReplyOpen(true)}>
				<Reply fontSize="inherit" />
			</IconButton>
			<IconButton size="small" onClick={toggleEditOpen(true)}>
				<MoreVert fontSize="inherit" />
			</IconButton>
		</Stack>
	) : null;

	return (
		<ListItem disablePadding sx={{ flex: 1 }}>
			<Stack direction="row" flex={1} my={1} alignItems="flex-start">
				<Divider orientation="vertical" flexItem />
				<Stack direction="column" flex={1}>
					<ListItemButton
						onClick={toggleSubOpen}
						sx={{ flex: 1, borderRadius: 1 }}>
						<Stack flex={1} direction="column" spacing={1}>
							{header}
							<Typography variant="body1">{comment.content}</Typography>
							{comment.subComments ? (
								<MoreHoriz
									fontSize="small"
									color="disabled"
									sx={{ alignSelf: 'center' }}
								/>
							) : null}
						</Stack>
					</ListItemButton>
					<Collapse in={subOpen} sx={{ ml: 2 }}>
						<CommentList
							comments={comment.subComments ?? []}
							canReply={canReply}
						/>
					</Collapse>
				</Stack>
				{buttons}
			</Stack>
			{canReply ? (
				<CommentReply
					open={replyOpen}
					onClose={toggleReplyOpen(false)}
					comment={comment}
				/>
			) : null}
			<CommentEditDialog
				open={editOpen}
				onClose={toggleEditOpen(false)}
				comment={comment}
			/>
		</ListItem>
	);
}
