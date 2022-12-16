import { Clear } from '@mui/icons-material';
import {
	IconButton,
	InputAdornment,
	TextField,
	TextFieldProps,
	Zoom,
} from '@mui/material';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSearchTerm } from './postsSlice';

export default function PostSearchBar(props: TextFieldProps) {
	const dispatch = useAppDispatch();
	const { searchTerm } = useAppSelector((state) => state.posts);

	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchTerm(event.target.value));
	};

	const handleClear = () => {
		dispatch(setSearchTerm(''));
	};

	return (
		<TextField
			{...props}
			variant="outlined"
			label="Search posts"
			value={searchTerm ?? ''}
			onChange={handleInput}
			InputProps={{
				endAdornment: (
					<Zoom in={!!searchTerm}>
						<InputAdornment position="end">
							<IconButton onClick={handleClear}>
								<Clear />
							</IconButton>
						</InputAdornment>
					</Zoom>
				),
			}}
		/>
	);
}
