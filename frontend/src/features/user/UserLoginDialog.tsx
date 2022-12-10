import { Close } from '@mui/icons-material';
import {
	Alert,
	Button,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useState } from 'react';

export interface UserLoginDialogProps {
	open: boolean;
	onClose: () => void;
}

export default function UserLoginDialog({
	open,
	onClose,
}: UserLoginDialogProps) {
	const [alertOpen, setAlertOpen] = useState(false);

	const handleLogin = () => {
		setAlertOpen(true);
	};

	const handleClose = () => {
		onClose();
	};

	const handleAlertClose = () => {
		setAlertOpen(false);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Login</DialogTitle>
			<DialogContent>
				<Stack direction="column" spacing={2}>
					<Typography variant="body1">
						Login with your username here to contribute to the forum.
					</Typography>
					<TextField required label="Username" variant="outlined" />
					<Collapse in={alertOpen}>
						<Alert
							severity="error"
							action={
								<IconButton onClick={handleAlertClose} size="small">
									<Close fontSize="inherit" />
								</IconButton>
							}>
							Error message goes here!
						</Alert>
					</Collapse>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button variant="contained" onClick={handleLogin}>
					Login
				</Button>
			</DialogActions>
		</Dialog>
	);
}
