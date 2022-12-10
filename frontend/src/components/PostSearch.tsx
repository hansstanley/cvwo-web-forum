import { Search } from '@mui/icons-material';
import { Box, Chip, Collapse, InputAdornment, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { FocusEvent, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectPostsTags } from '../features/posts/postsSlice';

export default function PostSearch() {
	const postsTags = useAppSelector(selectPostsTags);
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const [activeTags, setActiveTags] = useState<string[]>([]);

	const handleSearchFocus =
		(isFocused: boolean) => (event: FocusEvent<HTMLInputElement>) => {
			setDropdownOpen(isFocused);
		};

	return (
		<Stack direction="column">
			<TextField
				variant="outlined"
				placeholder="Search posts"
				onFocus={handleSearchFocus(true)}
				onBlur={handleSearchFocus(false)}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Stack direction="row" spacing={1} alignItems="center">
								<Search />
								<Chip label="Tag 1" />
								<Chip label="Tag 2" />
							</Stack>
						</InputAdornment>
					),
				}}>
				<Collapse in={dropdownOpen}>
					<Stack direction="row" spacing={1} flexWrap="wrap" p={1}>
						<Chip label="Hello" />
						{postsTags.map((tag) =>
							activeTags.includes(tag) ? null : <Chip label={tag} clickable />,
						)}
					</Stack>
				</Collapse>
			</TextField>
		</Stack>
	);
}
