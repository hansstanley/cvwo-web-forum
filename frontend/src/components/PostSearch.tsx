import { Search } from '@mui/icons-material';
import { Chip, InputAdornment, TextField } from '@mui/material';
import { Stack } from '@mui/system';

export default function PostSearch() {
	return (
		<TextField
			placeholder="Search posts"
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
			}}
			variant="outlined"
		/>
	);
}
