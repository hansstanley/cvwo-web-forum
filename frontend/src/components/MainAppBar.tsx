import {
	AppBar,
	Box,
	Divider,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';
import { ThemeToggle } from '../features/theme';
import { UserAuthButton } from '../features/user';
import UserWelcome from '../features/user/UserWelcome';

export default function MainAppBar() {
	return (
		<AppBar position="fixed" color="default">
			<Toolbar>
				<Typography variant="h6" fontWeight="bold">
					Gossip on Rails
				</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<Stack
					direction="row"
					spacing={1}
					alignItems="center"
					divider={<Divider orientation="vertical" flexItem />}>
					{UserWelcome()}
					<UserAuthButton />
					<ThemeToggle />
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
