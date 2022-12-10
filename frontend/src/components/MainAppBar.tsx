import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { UserAuthButton } from '../features/user';

export default function MainAppBar() {
	return (
		<AppBar position="fixed">
			<Toolbar>
				<Typography variant="h6">CVWO Web Forum</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<UserAuthButton />
			</Toolbar>
		</AppBar>
	);
}
