import { Delete, Edit, ExpandMore } from '@mui/icons-material';
import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Chip,
	Divider,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ForumPost } from '../../types';
import PostAddDialog from './PostAddDialog';

import PostDeleteDialog from './PostDeleteDialog';
import { addSearchTag, setCurrPostId, setPosts } from './postsSlice';

export interface PostAccordionProps {
	post: ForumPost;
}

export default function PostAccordion({ post }: PostAccordionProps) {
	const dispatch = useAppDispatch();
	const { currPost } = useAppSelector((state) => state.posts);
	const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
	const [updateOpen, setUpdateOpen] = useState<boolean>(false);

	const handleChange =
		(postId: number) => (event: SyntheticEvent, isExpanded: boolean) => {
			dispatch(setCurrPostId(isExpanded ? postId : -1));
		};

	const handleChipClick = (tag: string) => () => {
		dispatch(addSearchTag(tag));
	};

	const toggleUpdateOpen = (open: boolean) => () => {
		setUpdateOpen(open);
	};

	const toggleDeleteOpen = (open: boolean) => () => {
		setDeleteOpen(open);
	};

	return (
		<Accordion
			expanded={currPost?.postId === post.postId}
			onChange={handleChange(post.postId)}>
			<AccordionSummary expandIcon={<ExpandMore />}>
				<Stack direction="column" spacing={1}>
					<Typography fontWeight="bold">{post.title}</Typography>
					<Stack
						direction="row"
						spacing={1}
						divider={<Divider orientation="vertical" flexItem />}>
						{[
							post.createdBy?.username || 'Unknown',
							post.createdAt,
							...(post.tags ?? []),
						].map((s) => (
							<Typography variant="caption">{s}</Typography>
						))}
					</Stack>
				</Stack>
			</AccordionSummary>
			<AccordionDetails>
				<Stack direction="column" spacing={1}>
					{(post.tags ?? []).length > 0 ? (
						<Stack direction="row" spacing={1}>
							{post.tags?.map((tag) => (
								<Chip label={tag} onClick={handleChipClick(tag)} />
							))}
						</Stack>
					) : null}
					<Typography>{post.description}</Typography>
				</Stack>
			</AccordionDetails>
			<AccordionActions>
				<Tooltip title="Edit post">
					<IconButton size="small" onClick={toggleUpdateOpen(true)}>
						<Edit fontSize="inherit" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Delete post">
					<IconButton size="small" onClick={toggleDeleteOpen(true)}>
						<Delete fontSize="inherit" />
					</IconButton>
				</Tooltip>
			</AccordionActions>
			<PostAddDialog
				open={updateOpen}
				onClose={toggleUpdateOpen(false)}
				postToEdit={post}
			/>
			<PostDeleteDialog
				open={deleteOpen}
				onClose={toggleDeleteOpen(false)}
				post={post}
			/>
		</Accordion>
	);
}
