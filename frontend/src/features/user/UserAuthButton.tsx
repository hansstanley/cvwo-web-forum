import { AccountCircle, Logout } from '@mui/icons-material';
import {
	Avatar,
	Button,
	Divider,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Typography,
} from '@mui/material';
import { MouseEvent, useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import UserLoginDialog from './UserLoginDialog';
import UserLogoutDialog from './UserLogoutDialog';
import { selectLoginSuccess, selectUser } from './userSlice';

/**
 * Component containing the login button, login and logout dialogs,
 * and menu for account actions.
 * @returns Button, Dialog, Menu.
 */
export default function UserAuthButton() {
	const success = useAppSelector(selectLoginSuccess);
	const user = useAppSelector(selectUser);
	const [loginOpen, setLoginOpen] = useState(false);
	const [logoutOpen, setLogoutOpen] = useState(false);
	const [anchor, setAnchor] = useState<HTMLElement | null>();

	const menuOpen = useMemo(() => !!anchor, [anchor]);

	const toggleLoginOpen = (open: boolean) => () => {
		setLoginOpen(open);
	};

	const toggleLogoutOpen = (open: boolean) => () => {
		setLogoutOpen(open);
		handleMenuClose();
	};

	const handleAvatarClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchor(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchor(null);
	};

	return (
		<>
			{success ? (
				<IconButton size="small" onClick={handleAvatarClick}>
					<Avatar>{user?.username[0].toUpperCase()}</Avatar>
				</IconButton>
			) : (
				<Button color="inherit" onClick={toggleLoginOpen(true)}>
					Login
				</Button>
			)}
			<UserLoginDialog open={loginOpen} onClose={toggleLoginOpen(false)} />
			<UserLogoutDialog open={logoutOpen} onClose={toggleLogoutOpen(false)} />
			<Menu anchorEl={anchor} open={menuOpen} onClose={handleMenuClose}>
				<Divider variant="middle">
					<Typography fontWeight="bold">
						{user?.username ?? 'Unknown'}
					</Typography>
				</Divider>
				<MenuItem>
					<ListItemIcon>
						<AccountCircle />
					</ListItemIcon>
					<ListItemText>My account</ListItemText>
				</MenuItem>
				<MenuItem onClick={toggleLogoutOpen(true)}>
					<ListItemIcon>
						<Logout />
					</ListItemIcon>
					<ListItemText>Logout</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
}
