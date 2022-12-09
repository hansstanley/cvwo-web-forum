import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { AddPostFab, MainAppBar, MainFrame } from './components';

function App() {
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<MainAppBar />
			<Box component="main" sx={{ flexGrow: 1, padding: 2 }}>
				<Toolbar />
				<MainFrame />
			</Box>
			<AddPostFab />
		</Box>
	);
}

export default App;
