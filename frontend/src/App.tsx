import React, { useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import {
	Box,
	createTheme,
	CssBaseline,
	ThemeProvider,
	Toolbar,
	useMediaQuery,
} from '@mui/material';
import { MainAppBar, MainFrame } from './components';
import { PostAddFab } from './features/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setMobile } from './features/theme/themeSlice';

function App() {
	const dispatch = useAppDispatch();
	const { mode } = useAppSelector((state) => state.theme);

	const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

	const mobile = useMediaQuery(theme.breakpoints.down('md'));
	useEffect(() => {
		dispatch(setMobile(mobile));
	}, [mobile]);

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
