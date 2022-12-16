import {
	ArrowDownward,
	ArrowUpward,
	Clear,
	Close,
	Search,
	UnfoldLess,
	UnfoldMore,
} from '@mui/icons-material';
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
	Menu,
	MenuItem,
	Paper,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
	Zoom,
} from '@mui/material';
import _ from 'lodash';
import {
	ChangeEvent,
	FocusEvent,
	MouseEvent,
	SyntheticEvent,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FilterTerm, SortByTerm, SortTerm } from '../../types/post';
import {
	addSearchTag,
	dropSearchTag,
	selectPostsTags,
	selectSortTerm,
	setFilterTerm,
	setSearchTerm,
	setSortTerm,
} from './postsSlice';

export default function PostSearch() {
	const dispatch = useAppDispatch();
	const { searchTags, searchTerm } = useAppSelector((state) => state.posts);
	const sortTerm = useAppSelector(selectSortTerm);
	const postsTags = useAppSelector(selectPostsTags);
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const [filter, setFilter] = useState(0);
	const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>();

	const menuOpen = useMemo(() => !!menuAnchor, [menuAnchor]);
	const sortByTerms: SortByTerm[] = ['timestamp', 'title', 'user'];

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

	const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
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

	const handleFilterChange = (event: SyntheticEvent, newValue: number) => {
		const tabs: FilterTerm[] = ['all', 'user'];
		dispatch(setFilterTerm(tabs[newValue]));
		setFilter(newValue);
	};

	const handleSortClick = (event: MouseEvent<HTMLButtonElement>) => {
		setMenuAnchor(event.currentTarget);
	};

	const handleSort = (newSortTerm: SortTerm) => () => {
		dispatch(setSortTerm(newSortTerm));
		setMenuAnchor(null);
	};

	const handleSortClose = () => {
		setMenuAnchor(null);
	};

	return (
		<Stack direction="column">
			<TextField
				variant="outlined"
				label="Search posts"
				onClick={handleSearchFocus(true)}
				onChange={handleSearchInput}
				value={searchTerm ?? ''}
				InputProps={{
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
							<Button
								onClick={handleSortClick}
								endIcon={
									sortTerm.ascending ? <ArrowUpward /> : <ArrowDownward />
								}>
								{sortTerm.term}
							</Button>
							<IconButton onClick={toggleDropdown}>
								{dropdownOpen ? <UnfoldLess /> : <UnfoldMore />}
							</IconButton>
						</Stack>
					}
				/>
				<Menu
					anchorEl={menuAnchor}
					open={menuOpen}
					onClose={handleSort(sortTerm)}>
					{sortByTerms.map((term) => (
						<MenuItem
							onClick={handleSort({
								term,
								ascending: sortTerm.term === term ? !sortTerm.ascending : true,
							})}>
							{_.upperFirst(term)}
						</MenuItem>
					))}
				</Menu>
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
				<Tabs variant="fullWidth" value={filter} onChange={handleFilterChange}>
					<Tab label="All posts" />
					<Tab label="My posts" />
				</Tabs>
			</Card>
		</Stack>
	);
}
