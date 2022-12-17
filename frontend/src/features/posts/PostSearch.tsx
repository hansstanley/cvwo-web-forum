import { UnfoldLess, UnfoldMore } from '@mui/icons-material';
import {
	Card,
	CardContent,
	CardHeader,
	Chip,
	Collapse,
	IconButton,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PostSearchBar from './PostSearchBar';
import PostSearchSortButton from './PostSearchSortButton';
import PostSearchTabs from './PostSearchTabs';
import { addSearchTag, dropSearchTag, selectPostsTags } from './postsSlice';

/**
 * Container for components related to searching ForumPosts.
 * @returns Stack.
 */
export default function PostSearch() {
	const dispatch = useAppDispatch();
	const { searchTags } = useAppSelector((state) => state.posts);
	const postsTags = useAppSelector(selectPostsTags);
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

	const inactiveTags = useMemo(
		() => postsTags.filter((tag) => !searchTags.includes(tag)),
		[postsTags, searchTags],
	);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

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
			<PostSearchBar onClick={handleSearchFocus(true)} />
			<Collapse in={searchTags.length > 0}>
				<Paper sx={{ mt: 2, pt: 1, px: 1 }}>
					{searchTags.length > 0 ? (
						searchTags.map((tag, index) => (
							<Chip
								key={index}
								label={tag}
								variant="outlined"
								onDelete={handleChipDelete(tag)}
								sx={{ mb: 1, mr: 1 }}
							/>
						))
					) : (
						<Chip
							label="No tags"
							variant="outlined"
							sx={{ fontStyle: 'italic' }}
						/>
					)}
				</Paper>
			</Collapse>
			<Card sx={{ mt: 2 }}>
				<CardHeader
					subheader="Tags and filters"
					action={
						<Stack direction="row" spacing={1}>
							<PostSearchSortButton />
							<IconButton onClick={toggleDropdown}>
								{dropdownOpen ? <UnfoldLess /> : <UnfoldMore />}
							</IconButton>
						</Stack>
					}
				/>
				<Collapse in={dropdownOpen}>
					<CardContent>
						<Stack direction="row" flexWrap="wrap">
							{inactiveTags.length > 0 ? (
								inactiveTags.map((tag, index) => (
									<Chip
										key={index}
										label={tag}
										onClick={handleChipClick(tag)}
										sx={{ mb: 1, mr: 1 }}
									/>
								))
							) : (
								<Typography variant="body2" fontStyle="italic">
									No more tags.
								</Typography>
							)}
						</Stack>
					</CardContent>
				</Collapse>
				<PostSearchTabs />
			</Card>
		</Stack>
	);
}
