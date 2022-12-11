import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
	Alert,
	Button,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handleUserLogin } from './userApi';
import { onLoginFailure, onLoginStart, onLoginSuccess } from './userSlice';

export interface UserLoginDialogProps {
	open: boolean;
	onClose: () => void;
}

export default function UserLoginDialog({
	open,
	onClose,
}: UserLoginDialogProps) {
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector((state) => state.user);
	const [alertOpen, setAlertOpen] = useState<boolean>(false);
	const [alertMessage, setAlertMessage] = useState<string>('');
	const [username, setUsername] = useState<string>('');

	const handleLogin = async () => {
		setAlertOpen(false);
		try {
			dispatch(onLoginStart());
			const user = await handleUserLogin(username);
			dispatch(onLoginSuccess(user));
			handleClose();
		} catch (e) {
			dispatch(onLoginFailure());
			if (e instanceof Error) {
				setAlertMessage(e.message);
			} else if (typeof e === 'string') {
				setAlertMessage(e);
			}
			setAlertOpen(true);
		}
	};

	const handleClose = () => {
		onClose();
		setAlertOpen(false);
		setAlertMessage('');
		setUsername('');
	};

	const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Login</DialogTitle>
			<DialogContent>
				<Stack direction="column" spacing={2}>
					<DialogContentText>
						Login with your username here to contribute to the forum.
					</DialogContentText>
					<TextField
						autoFocus
						required
						id="username"
						type="text"
						error={alertOpen}
						label="Username"
						value={username}
						helperText={alertMessage}
						variant="outlined"
						onChange={handleUsernameChange}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<LoadingButton
					loading={loading}
					variant="contained"
					onClick={handleLogin}>
					Login
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}
