import { Clear, Close, Search } from '@mui/icons-material';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Chip,
	Collapse,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { FocusEvent, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addSearchTag, dropSearchTag, selectPostsTags } from './postsSlice';

export default function PostSearch() {
	const dispatch = useAppDispatch();
	const { searchTags } = useAppSelector((state) => state.posts);
	const postsTags = useAppSelector(selectPostsTags);
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

	const inactiveTags = useMemo(
		() => postsTags.filter((tag) => !searchTags.includes(tag)),
		[postsTags, searchTags],
	);

	const handleSearchFocus = (isFocused: boolean) => () => {
		setDropdownOpen(isFocused);
	};

	const handleChipClick = (tag: string) => () => {
		dispatch(addSearchTag(tag));
	};

	const handleChipDelete = (tag: string) => () => {
		dispatch(dropSearchTag(tag));
	};

	return (
		<Stack direction="column">
			<TextField
				variant="outlined"
				placeholder="Search posts"
				onClick={handleSearchFocus(true)}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Stack direction="row" spacing={1} alignItems="center">
								<Search />
								{searchTags.map((tag) => (
									<Chip label={tag} onDelete={handleChipDelete(tag)} />
								))}
							</Stack>
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							<IconButton>
								<Clear />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<Collapse in={dropdownOpen}>
				<Card sx={{ mt: 1 }}>
					<CardHeader
						subheader="Suggestions"
						action={
							<IconButton onClick={handleSearchFocus(false)}>
								<Close />
							</IconButton>
						}
					/>
					<CardContent>
						<Stack direction="row" spacing={1} flexWrap="wrap">
							{inactiveTags.length > 0 ? (
								inactiveTags.map((tag) => (
									<Chip label={tag} onClick={handleChipClick(tag)} />
								))
							) : (
								<Typography variant="caption">No more tags.</Typography>
							)}
						</Stack>
					</CardContent>
				</Card>
			</Collapse>
		</Stack>
	);
}
