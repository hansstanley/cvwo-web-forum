import { Add } from '@mui/icons-material';
import { Fab, Tooltip, Zoom } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectLoginSuccess } from '../user/userSlice';
import PostAddDialog from './PostAddDialog';

/**
 * Floating action button for ForumPost creation.
 * @returns Zoom with Fab, Dialog.
 */
export default function PostAddFab() {
	const success = useAppSelector(selectLoginSuccess);
	const [dialogOpen, setDialogOpen] = useState(false);

	const toggleDialogOpen = (open: boolean) => () => {
		setDialogOpen(open && success);
	};

	return (
		<>
			<Tooltip title="Create post">
				<Zoom in={success}>
					<Fab
						color="primary"
						onClick={toggleDialogOpen(true)}
						sx={{ position: 'fixed', bottom: 16, right: 16 }}>
						<Add />
					</Fab>
				</Zoom>
			</Tooltip>
			<PostAddDialog open={dialogOpen} onClose={toggleDialogOpen(false)} />
		</>
	);
}
