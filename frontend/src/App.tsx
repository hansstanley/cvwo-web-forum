import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import {
	Box,
	createTheme,
	CssBaseline,
	ThemeProvider,
	Toolbar,
} from '@mui/material';
import { MainAppBar, MainFrame } from './components';
import { PostAddFab } from './features/posts';
import { useAppSelector } from './app/hooks';

function App() {
	const { mode } = useAppSelector((state) => state.theme);

	const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<MainAppBar />
				<Box component="main" sx={{ flex: 1 }}>
					<Toolbar />
					<MainFrame />
				</Box>
				<PostAddFab />
			</Box>
		</ThemeProvider>
	);
}

export default App;
