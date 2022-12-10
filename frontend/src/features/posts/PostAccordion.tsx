import { ExpandMore } from '@mui/icons-material';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Chip,
	Stack,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrPostTags, setCurrPostId } from './postsSlice';

export default function PostAccordion() {
	const dispatch = useAppDispatch();

	const { currPost, posts } = useAppSelector((state) => state.posts);
	const currPostTags = useAppSelector(selectCurrPostTags);

	const handleChange =
		(postId: number) => (event: SyntheticEvent, isExpanded: boolean) => {
			dispatch(setCurrPostId(isExpanded ? postId : -1));
		};

	return (
		<Box sx={{ flex: 1 }}>
			{posts.map((post) => (
				<Accordion
					expanded={currPost?.postId === post.postId}
					onChange={handleChange(post.postId)}>
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Typography sx={{ width: '33%', flexShrink: 0 }}>
							{post.title}
						</Typography>
						<Typography>{post.createdAt}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Stack direction="column" spacing={2}>
							<Stack direction="row" spacing={1}>
								{currPostTags.map((tag) => (
									<Chip label={tag} />
								))}
							</Stack>
							<Typography>{post.description}</Typography>
						</Stack>
					</AccordionDetails>
				</Accordion>
			))}
			<Accordion expanded={false}>
				<AccordionSummary>
					<Button>Load more</Button>
				</AccordionSummary>
			</Accordion>
		</Box>
	);
}
