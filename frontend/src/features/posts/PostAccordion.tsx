import { Close, Delete, Edit, ExpandMore, Reply } from '@mui/icons-material';
import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Chip,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Slide,
	Stack,
	Tooltip,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, ReactElement, Ref, SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ForumPost } from '../../types';
import { selectMobile } from '../theme/themeSlice';
import PostAddDialog from './PostAddDialog';

import PostDeleteDialog from './PostDeleteDialog';
import PostDetail from './PostDetail';
import { addSearchTag, setCurrPostId, setPosts } from './postsSlice';

export interface PostAccordionProps {
	post: ForumPost;
}

export default function PostAccordion({ post }: PostAccordionProps) {
	const dispatch = useAppDispatch();
	const { currPost } = useAppSelector((state) => state.posts);
	const [commentOpen, setCommentOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState<boolean>(false);
	const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

	const isMobile = useAppSelector(selectMobile);

	const handleChange =
		(postId: number) => (event: SyntheticEvent, isExpanded: boolean) => {
			dispatch(setCurrPostId(isExpanded ? postId : -1));
		};

	const handleChipClick = (tag: string) => () => {
		dispatch(addSearchTag(tag));
	};

	const toggleCommentOpen = (open: boolean) => () => {
		setCommentOpen(open);
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
				<Stack
					direction="column"
					spacing={1}
					divider={<Divider orientation="horizontal" />}>
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
				{isMobile ? (
					<Tooltip title="View comments">
						<IconButton size="small" onClick={toggleCommentOpen(true)}>
							<Reply fontSize="inherit" />
						</IconButton>
					</Tooltip>
				) : null}
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
			{isMobile ? (
				<Dialog
					open={commentOpen}
					onClose={toggleCommentOpen(false)}
					fullScreen
					TransitionComponent={Transition}>
					<IconButton
						onClick={toggleCommentOpen(false)}
						sx={{ position: 'absolute', top: 8, right: 8 }}>
						<Close />
					</IconButton>
					<PostDetail />
				</Dialog>
			) : null}
		</Accordion>
	);
}

const Transition = forwardRef(function Transition(
	props: TransitionProps & { children: ReactElement<any, any> },
	ref: Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});
