import { Add } from '@mui/icons-material';
import { Fab, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import PostAddDialog from './PostAddDialog';

export default function PostAddFab() {
	const { success } = useAppSelector((state) => state.user);
	const [dialogOpen, setDialogOpen] = useState(false);

	const toggleDialogOpen = (open: boolean) => () => {
		setDialogOpen(open);
	};

	return (
		<>
			<Tooltip title="Create post">
				<Fab
					color="primary"
					disabled={!success}
					onClick={toggleDialogOpen(true)}
					sx={{ position: 'fixed', bottom: 16, right: 16 }}>
					<Add />
				</Fab>
			</Tooltip>
			<PostAddDialog open={dialogOpen} onClose={toggleDialogOpen(false)} />
		</>
	);
}
