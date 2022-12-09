import { Paper, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';

export default function PostDetail() {
	const { currPost } = useAppSelector((state) => state.posts);

	return (
		<Paper
			elevation={2}
			sx={{
				flex: 1,
				padding: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			{currPost ? (
				<Typography variant="h6">{currPost.title}</Typography>
			) : (
				<Typography>Select a post to view comments</Typography>
			)}
		</Paper>
	);
}
