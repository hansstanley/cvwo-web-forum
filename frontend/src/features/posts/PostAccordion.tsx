import { Close, Delete, Edit, ExpandMore, Reply } from '@mui/icons-material';
import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Chip,
	Collapse,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Paper,
	Slide,
	Stack,
	Tooltip,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import {
	forwardRef,
	ReactElement,
	Ref,
	SyntheticEvent,
	useMemo,
	useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { formatTimestamp } from '../../app/utils';
import { ForumPost } from '../../types/post';
import { selectMobile } from '../theme/themeSlice';
import { selectLoginSuccess } from '../user/userSlice';
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
	const { userInfo } = useAppSelector((state) => state.user);
	const loginSuccess = useAppSelector(selectLoginSuccess);
	const [commentOpen, setCommentOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState<boolean>(false);
	const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

	const isMobile = useAppSelector(selectMobile);

	const showEditDelete = useMemo(
		() => loginSuccess && userInfo?.id === currPost?.user?.id,
		[loginSuccess, userInfo, currPost],
	);

	const handleChange = (event: SyntheticEvent, isExpanded: boolean) => {
		dispatch(setCurrPostId(isExpanded ? post.id ?? -1 : -1));
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

	const tagStrip =
		(post.tags ?? []).length > 0 ? (
			<Stack direction="row" flexWrap="wrap">
				{post.tags?.map((tag, index) => (
					<Chip
						key={index}
						label={tag}
						onClick={handleChipClick(tag)}
						sx={{ mb: 1, mr: 1 }}
					/>
				))}
			</Stack>
		) : null;

	const descriptionStrip = post.description ? (
		<Paper variant="outlined" sx={{ p: 1 }}>
			<Typography>{post.description}</Typography>
		</Paper>
	) : (
		<Typography variant="body2" fontStyle="italic">
			No description.
		</Typography>
	);

	return (
		<Accordion expanded={currPost?.id === post.id} onChange={handleChange}>
			<AccordionSummary expandIcon={<ExpandMore />}>
				<Stack direction="column" spacing={1}>
					<Typography fontWeight="bold">{post.title}</Typography>
					<Stack
						direction="row"
						spacing={1}
						divider={<Divider orientation="vertical" flexItem />}>
						{[
							post.user?.username || 'Unknown',
							formatTimestamp(post.created_at ?? ''),
						].map((s, index) => (
							<Typography key={index} variant="caption">
								{s}
							</Typography>
						))}
					</Stack>
				</Stack>
			</AccordionSummary>
			<AccordionDetails>
				<Stack direction="column" spacing={2}>
					{tagStrip}
					{descriptionStrip}
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
				{showEditDelete ? (
					<>
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
					</>
				) : null}
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
