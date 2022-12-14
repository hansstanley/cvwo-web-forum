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
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handleUserLogin } from './userApi';

export interface UserLoginDialogProps {
	open: boolean;
	onClose: () => void;
}

export default function UserLoginDialog({
	open,
	onClose,
}: UserLoginDialogProps) {
	const dispatch = useAppDispatch();
	const { status } = useAppSelector((state) => state.user);
	const [username, setUsername] = useState<string>('');

	const handleLogin = () => {
		dispatch(handleUserLogin(username));
	};

	const handleClose = useCallback(() => {
		onClose();
		setUsername('');
	}, [onClose]);

	const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	useEffect(() => {
		if (status.status === 'success') {
			handleClose();
		}
	}, [status, handleClose]);

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Nice to meet you!</DialogTitle>
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
						error={status.status === 'failure'}
						label="Username"
						value={username}
						helperText={status.errorMessage}
						variant="outlined"
						onChange={handleUsernameChange}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<LoadingButton
					loading={status.status === 'loading'}
					variant="contained"
					onClick={handleLogin}>
					Login
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}
