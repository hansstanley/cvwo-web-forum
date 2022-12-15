import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
	Alert,
	Box,
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
import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Auth } from '../../types/user';
import { handleUserLogin, handleUserRegister } from './userApi';

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
	const [register, setRegister] = useState(false);
	const [auth, setAuth] = useState<Auth>({
		username: '',
		password: '',
	});

	const handleClose = useCallback(() => {
		onClose();
		setAuth({ username: '', password: '' });
		setRegister(false);
	}, [onClose]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setAuth({
			...auth,
			[event.target.id]: event.target.value,
		});
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (register) {
			await dispatch(handleUserRegister(auth));
		}
		await dispatch(handleUserLogin(auth));
	};

	const handleRegisterToggle = () => {
		setRegister(!register);
	};

	useEffect(() => {
		if (status.status === 'success') {
			handleClose();
		}
	}, [status, handleClose]);

	const authForm = (
		<Stack direction="column">
			<TextField
				autoFocus
				required
				id="username"
				type="text"
				label="Username"
				value={auth.username}
				variant="outlined"
				onChange={handleChange}
				margin="dense"
			/>
			<TextField
				required
				id="password"
				type="password"
				label="Password"
				margin="dense"
				value={auth.password}
				onChange={handleChange}
			/>
			<Collapse in={register}>
				<TextField
					id="password_confirmation"
					type="password"
					label="Confirm password"
					margin="dense"
					fullWidth
					required={register}
					value={auth.password_confirmation ?? ''}
					onChange={handleChange}
				/>
			</Collapse>
		</Stack>
	);

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<Box component="form" onSubmit={handleSubmit}>
				<DialogTitle>
					{register ? 'Nice to meet you!' : 'Welcome back!'}
				</DialogTitle>
				<DialogContent>
					{authForm}
					<Button onClick={handleRegisterToggle} sx={{ mt: 1 }}>
						{register ? 'Already' : "Don't"} have an account?
					</Button>
					<Collapse in={status.status === 'failure'}>
						<Alert severity="error">{status.errorMessage}</Alert>
					</Collapse>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<LoadingButton
						id="submit"
						type="submit"
						loading={status.status === 'loading'}
						variant="contained">
						{register ? 'Register' : 'Login'}
					</LoadingButton>
				</DialogActions>
			</Box>
		</Dialog>
	);
}
