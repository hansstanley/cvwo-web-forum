import { ExpandMore } from '@mui/icons-material';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Chip,
	Stack,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrPostId } from './postsSlice';

export default function PostAccordion() {
	const dispatch = useAppDispatch();

	const { currPost, posts } = useAppSelector((state) => state.posts);

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
								<Chip label="Chip 1" />
								<Chip label="Chip 2" />
								<Chip label="Chip 3" />
							</Stack>
							<Typography>{post.description}</Typography>
						</Stack>
					</AccordionDetails>
				</Accordion>
			))}
		</Box>
	);
}
