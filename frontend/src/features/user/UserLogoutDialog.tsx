import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { onLogout } from './userSlice';

export interface UserLogoutDialogProps {
	open: boolean;
	onClose: () => void;
}

/**
 * Dialog component to request user confirmation.
 * @param param0 Props.
 * @returns Dialog.
 */
export default function UserLogoutDialog({
	open,
	onClose,
}: UserLogoutDialogProps) {
	const dispatch = useAppDispatch();

	const handleClose = () => {
		onClose();
	};

	const handleLogout = () => {
		dispatch(onLogout());
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Hope to see you again!</DialogTitle>
			<DialogContent>
				<Typography variant="body1">Are you sure to logout?</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button variant="contained" onClick={handleLogout}>
					Logout
				</Button>
			</DialogActions>
		</Dialog>
	);
}
