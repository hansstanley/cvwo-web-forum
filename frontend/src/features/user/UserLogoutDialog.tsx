import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';

export interface UserLogoutDialogProps {
	open: boolean;
	onClose: () => void;
}

export default function UserLogoutDialog({
	open,
	onClose,
}: UserLogoutDialogProps) {
	const handleLogout = () => {};

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Logout</DialogTitle>
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
