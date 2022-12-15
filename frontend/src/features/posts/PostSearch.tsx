import { Clear, Close, Search, UnfoldLess } from '@mui/icons-material';
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
	Zoom,
} from '@mui/material';
import { ChangeEvent, FocusEvent, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	addSearchTag,
	dropSearchTag,
	selectPostsTags,
	setSearchTerm,
} from './postsSlice';

export default function PostSearch() {
	const dispatch = useAppDispatch();
	const { searchTags, searchTerm } = useAppSelector((state) => state.posts);
	const postsTags = useAppSelector(selectPostsTags);
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

	const inactiveTags = useMemo(
		() => postsTags.filter((tag) => !searchTags.includes(tag)),
		[postsTags, searchTags],
	);

	const handleSearchFocus = (isFocused: boolean) => () => {
		setDropdownOpen(isFocused);
	};

	const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
		dispatch(setSearchTerm(event.target.value));
	};

	const handleSearchClear = () => {
		dispatch(setSearchTerm(''));
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
				onChange={handleSearchInput}
				value={searchTerm ?? ''}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Stack direction="row" spacing={1} alignItems="center">
								<Search />
								{searchTags.map((tag, index) => (
									<Chip
										key={index}
										label={tag}
										onDelete={handleChipDelete(tag)}
									/>
								))}
							</Stack>
						</InputAdornment>
					),
					endAdornment: (
						<Zoom in={!!searchTerm}>
							<InputAdornment position="end">
								<IconButton onClick={handleSearchClear}>
									<Clear />
								</IconButton>
							</InputAdornment>
						</Zoom>
					),
				}}
			/>
			<Collapse in={dropdownOpen}>
				<Card sx={{ mt: 2 }}>
					<CardHeader
						subheader="Tags"
						action={
							<IconButton onClick={handleSearchFocus(false)}>
								<UnfoldLess />
							</IconButton>
						}
					/>
					<CardContent>
						<Stack direction="row" spacing={1} flexWrap="wrap">
							{inactiveTags.length > 0 ? (
								inactiveTags.map((tag, index) => (
									<Chip
										key={index}
										label={tag}
										onClick={handleChipClick(tag)}
									/>
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
