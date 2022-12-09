import { Add } from '@mui/icons-material';
import { Fab, Tooltip } from '@mui/material';

export default function AddPostFab() {
	return (
		<Tooltip title="Create post">
			<Fab color="primary" sx={{ position: 'absolute', bottom: 16, right: 16 }}>
				<Add />
			</Fab>
		</Tooltip>
	);
}
