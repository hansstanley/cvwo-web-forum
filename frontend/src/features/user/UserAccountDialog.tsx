import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Stack,
	TextField,
} from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { pushSnack } from '../snacks/snacksSlice';
import { updatePassword } from './userApi';
import { selectUser } from './userSlice';

export interface UserAccountDialogProps {
	open: boolean;
	onClose: () => void;
}

/**
 * Dialog component for user account customisation.
 * @param param0 Props.
 * @returns Dialog.
 */
export default function UserAccountDialog({
	open,
	onClose,
}: UserAccountDialogProps) {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const handleClose = () => {
		setPassword('');
		setPasswordConfirm('');
		onClose();
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handlePasswordConfirmChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		setPasswordConfirm(event.target.value);
	};

	const handlePasswordUpdate = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (password !== passwordConfirm) {
			dispatch(
				pushSnack({ message: 'Password do not match', severity: 'error' }),
			);
			return;
		}

		setLoading(true);
		try {
			await dispatch(updatePassword(password));
			dispatch(
				pushSnack({ message: 'Password updated!', severity: 'success' }),
			);
		} catch (err) {
			dispatch(pushSnack({ message: `${err}`, severity: 'error' }));
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>My Account</DialogTitle>
			<DialogContent>
				<Stack
					component="form"
					onSubmit={handlePasswordUpdate}
					direction="column"
					spacing={1}>
					<TextField
						disabled
						label="Username"
						margin="dense"
						value={user?.username ?? 'Unknown'}
					/>
					<Divider />
					<TextField
						label="New password"
						margin="dense"
						value={password}
						onChange={handlePasswordChange}
					/>
					<TextField
						label="Confirm password"
						margin="dense"
						value={passwordConfirm}
						onChange={handlePasswordConfirmChange}
					/>
					<LoadingButton
						type="submit"
						loading={loading}
						disabled={!password}
						sx={{ alignSelf: 'flex-start' }}>
						Update password
					</LoadingButton>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
}
