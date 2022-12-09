import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function MainAppBar() {
	return (
		<AppBar position="fixed">
			<Toolbar>
				<Typography variant="h6">CVWO Web Forum</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<Button color="inherit">Login</Button>
			</Toolbar>
		</AppBar>
	);
}
