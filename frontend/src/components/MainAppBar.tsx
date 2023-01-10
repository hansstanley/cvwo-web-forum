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

/**
 * App bar of the forum.
 * @returns AppBar.
 */
export default function MainAppBar() {
	return (
		<AppBar position="fixed" color="default" elevation={1}>
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
					<UserAuthButton />
					<ThemeToggle />
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
