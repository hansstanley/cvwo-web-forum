import { Button } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import UserLoginDialog from './UserLoginDialog';
import UserLogoutDialog from './UserLogoutDialog';

export default function UserAuthButton() {
	const { success } = useAppSelector((state) => state.user);
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
