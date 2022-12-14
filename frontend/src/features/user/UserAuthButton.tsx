import { Button, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import UserLoginDialog from './UserLoginDialog';
import UserLogoutDialog from './UserLogoutDialog';

export default function UserAuthButton() {
	const { status, userInfo } = useAppSelector((state) => state.user);
	const [loginOpen, setLoginOpen] = useState(false);
	const [logoutOpen, setLogoutOpen] = useState(false);

	const success = useMemo(() => status.status === 'success', [status]);

	const toggleLoginOpen = (open: boolean) => () => {
		setLoginOpen(open);
	};

	const toggleLogoutOpen = (open: boolean) => () => {
		setLogoutOpen(open);
	};

	return (
		<>
			{success ? <Typography>Welcome, {userInfo?.username}!</Typography> : null}
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
