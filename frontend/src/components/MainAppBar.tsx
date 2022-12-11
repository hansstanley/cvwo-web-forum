import { AppBar, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ThemeToggle } from '../features/theme';
import { UserAuthButton } from '../features/user';

export default function MainAppBar() {
	return (
		<AppBar position="fixed">
			<Toolbar>
				<Typography variant="h6">CVWO Web Forum</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<UserAuthButton />
				<ThemeToggle />
			</Toolbar>
		</AppBar>
	);
}
