import { Delete, Edit, ExpandMore } from '@mui/icons-material';
import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Button,
	Chip,
	Divider,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addSearchTag, setCurrPostId } from './postsSlice';

export default function PostAccordion() {
	const dispatch = useAppDispatch();
	const { currPost, posts } = useAppSelector((state) => state.posts);

	const handleChange =
		(postId: number) => (event: SyntheticEvent, isExpanded: boolean) => {
			dispatch(setCurrPostId(isExpanded ? postId : -1));
		};

	const handleChipClick = (tag: string) => () => {
		dispatch(addSearchTag(tag));
	};

	return (
		<Box sx={{ flex: 1 }}>
			{posts.map((post) => (
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
						<IconButton size="small" onClick={() => {}}>
							<Edit fontSize="inherit" />
						</IconButton>
						<IconButton size="small" onClick={() => {}}>
							<Delete fontSize="inherit" />
						</IconButton>
					</AccordionActions>
				</Accordion>
			))}
		</Box>
	);
}
