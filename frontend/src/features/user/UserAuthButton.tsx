import { Button, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import UserLoginDialog from './UserLoginDialog';
import UserLogoutDialog from './UserLogoutDialog';
import { selectLoginSuccess } from './userSlice';

export default function UserAuthButton() {
	const success = useAppSelector(selectLoginSuccess);
	const [loginOpen, setLoginOpen] = useState(false);
	const [logoutOpen, setLogoutOpen] = useState(false);

	const toggleLoginOpen = (open: boolean) => () => {
		setLoginOpen(open);
	};

	const toggleLogoutOpen = (open: boolean) => () => {
		setLogoutOpen(open);
	};

	return (
		<>
			<Button
				color="inherit"
				onClick={success ? toggleLogoutOpen(true) : toggleLoginOpen(true)}>
				{success ? 'Logout' : 'Login'}
			</Button>
			<UserLoginDialog open={loginOpen} onClose={toggleLoginOpen(false)} />
			<UserLogoutDialog open={logoutOpen} onClose={toggleLogoutOpen(false)} />
		</>
	);
}
