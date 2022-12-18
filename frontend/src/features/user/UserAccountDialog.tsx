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
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { pushSnack } from '../snacks/snacksSlice';
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

	const handleUpdate = () => {
		dispatch(
			pushSnack({ message: 'Not yet implemented', severity: 'warning' }),
		);
	};

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>My Account</DialogTitle>
			<DialogContent>
				<Stack direction="column" spacing={1}>
					<TextField
						label="Username"
						margin="dense"
						value={user?.username ?? ''}
					/>
					<Button onClick={handleUpdate} sx={{ alignSelf: 'flex-start' }}>
						Update username
					</Button>
					<Divider />
					<TextField label="New password" margin="dense" value={''} />
					<TextField label="Confirm password" margin="dense" value={''} />
					<Button onClick={handleUpdate} sx={{ alignSelf: 'flex-start' }}>
						Update password
					</Button>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
}
