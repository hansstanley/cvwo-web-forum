import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { MainAppBar, MainFrame } from './components';
import { PostAddFab } from './features/posts';

function App() {
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<MainAppBar />
			<Box component="main" sx={{ flex: 1 }}>
				<Toolbar />
				<MainFrame />
			</Box>
			<PostAddFab />
		</Box>
	);
}

export default App;
