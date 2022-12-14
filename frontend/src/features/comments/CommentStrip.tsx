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
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UpDownVoter } from '../../components';
import { ForumComment } from '../../types';
import { selectLoginSuccess } from '../user/userSlice';
import CommentEditDialog from './CommentEditDialog';
import CommentList from './CommentList';
import CommentReply from './CommentReply';
import { selectCommentsSortedByTimestamp } from './commentsSlice';

export interface CommentStripProps {
	comment: ForumComment;
	canReply?: boolean;
}

export default function CommentStrip({
	comment,
	canReply = false,
}: CommentStripProps) {
	const comments = useAppSelector(selectCommentsSortedByTimestamp);
	const loginSuccess = useAppSelector(selectLoginSuccess);
	const { userInfo } = useAppSelector((state) => state.user);
	const [subOpen, setSubOpen] = useState(false);
	const [replyOpen, setReplyOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);

	const subcomments = useMemo(
		() => comments.filter((c) => c.parent_id === comment.id),
		[comments, comment],
	);

	const showReply = useMemo(
		() => loginSuccess && canReply && !comment.deleted,
		[loginSuccess, canReply, comment],
	);

	const showEdit = useMemo(
		() => loginSuccess && userInfo?.id === comment.user?.id && !comment.deleted,
		[loginSuccess, userInfo, comment],
	);

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
				{comment.user?.username ?? 'Unknown'}
			</Typography>
			<Typography variant="caption">{comment.updated_at}</Typography>
		</Stack>
	);

	const buttons = (
		<Stack direction="column">
			{showReply ? (
				<IconButton size="small" onClick={toggleReplyOpen(true)}>
					<Reply fontSize="inherit" />
				</IconButton>
			) : null}
			{showEdit ? (
				<IconButton size="small" onClick={toggleEditOpen(true)}>
					<MoreVert fontSize="inherit" />
				</IconButton>
			) : null}
		</Stack>
	);

	return (
		<ListItem disablePadding sx={{ flex: 1 }}>
			<Stack direction="row" flex={1} my={1} alignItems="flex-start">
				<Divider orientation="vertical" flexItem />
				<Stack direction="column" flex={1}>
					<ListItemButton
						onClick={toggleSubOpen}
						sx={{ flex: 1, borderRadius: 1 }}>
						<Stack flex={1} direction="column" spacing={1}>
							{comment.deleted ? (
								<DeletedStrip />
							) : (
								<>
									{header}
									<Typography variant="body1">{comment.content}</Typography>
								</>
							)}
							{comment.forum_comments?.length ? (
								<MoreHoriz
									fontSize="small"
									color="disabled"
									sx={{ alignSelf: 'center' }}
								/>
							) : null}
						</Stack>
					</ListItemButton>
					<Collapse in={subOpen} sx={{ ml: 2 }}>
						<CommentList comments={subcomments} canReply={canReply} />
					</Collapse>
				</Stack>
				{buttons}
			</Stack>
			{showReply ? (
				<CommentReply
					open={replyOpen}
					onClose={toggleReplyOpen(false)}
					comment={comment}
				/>
			) : null}
			{showEdit ? (
				<CommentEditDialog
					open={editOpen}
					onClose={toggleEditOpen(false)}
					comment={comment}
				/>
			) : null}
		</ListItem>
	);
}

function DeletedStrip() {
	return (
		<Stack flex={1} direction="column" spacing={1}>
			<Typography fontStyle="italic" fontWeight="bold" color="GrayText">
				Username hidden
			</Typography>
			<Typography fontStyle="italic" color="GrayText">
				This comment has been deleted.
			</Typography>
		</Stack>
	);
}
